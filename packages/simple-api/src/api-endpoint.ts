import { newInstanceOf, IContainer } from '@aurelia/kernel';
import { HttpClientConfiguration, IHttpClient } from '@aurelia/fetch-client';
import { IRestFetchOptions as IApiRequestOptions, HttpMethods, IRestRequestData as IApiRequestData, IRestFetchRequestOptions as IApiFullRequestOptions, RequestBody } from './interfaces';
import { ResponseParser, ResponseType, responseParsers } from './parsers/response-parsers';
import { buildUrl } from './utilities';
import { streamParsers } from './parsers/stream-parsers';


const prepareRequestBody = (body: BodyInit | null | undefined, convertToJson = true) =>
    (convertToJson && body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)
        && !(body instanceof Blob) && !(body instanceof ArrayBuffer) && !(body instanceof ReadableStream))
        ? JSON.stringify(body)
        : body;


//export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => HttpClientConfiguration);
export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => void);

export class ApiEndpoint {
    public readonly client: IHttpClient;
    public parser?: ResponseType<unknown>;

    public convertToJson = true;

    constructor(
        readonly container: IContainer,
        config: ApiEndpointClientConfig,
        parser: ResponseParser<unknown> = 'json'
    ) {
        this.client = this.container.get(newInstanceOf(IHttpClient));
        this.client?.configure(config);
        this.setParser(parser);
    }

    public setParser(parser: ResponseParser<unknown>) {
        this.parser = this.findParser(parser);
    }

    public get<T>(resource: string, options?: IApiRequestOptions<T>): Promise<T> {
        return this.request<T>('GET', resource, options) as Promise<T>;
    }
    public post<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): Promise<T> {
        (options as IApiFullRequestOptions<T>).body = prepareRequestBody(body, this.convertToJson);
        return this.request<T>('POST', resource, options) as Promise<T>;
    }
    public patch<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): Promise<T> {
        (options as IApiFullRequestOptions<T>).body = prepareRequestBody(body, this.convertToJson);
        return this.request<T>('PATCH', resource, options) as Promise<T>;
    }
    public put<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): Promise<T> {
        (options as IApiFullRequestOptions<T>).body = prepareRequestBody(body, this.convertToJson);
        return this.request<T>('PUT', resource, options) as Promise<T>;
    }
    public delete<T>(resource: string, options?: IApiRequestOptions<T>): Promise<T> {
        return this.request<T>('DELETE', resource, options) as Promise<T>;
    }

    private async request<T>(method: HttpMethods, resource: string, options?: IApiFullRequestOptions<T>): Promise<T | Response> {
        const requestData = this.buildRequest(method, resource, options);
        if (options?.beforeSend) { options.beforeSend(requestData); }
        const request = this.client.fetch(requestData.resource, requestData.request);

        const response = await request;

        const onStreamChunck = options?.stream?.onChunk;
        if (onStreamChunck) {
            const streamParser = options?.stream?.parser ?? streamParsers.default;
            await streamParser(response, onStreamChunck);
        }

        const responseParser = this.findParser<T>(options?.responseParser);
        if (!responseParser) {
            return response;
        }

        return responseParser!(response);
    }

    private buildRequest<T>(method: HttpMethods, resource: string, options?: IApiRequestOptions<T>): IApiRequestData {
        const request = this.client?.defaults ? structuredClone(this.client.defaults) : {};
        request.method = method;
        return {
            resource,
            url: buildUrl(resource, options?.query),
            request
        } as IApiRequestData;
    }

    private findParser<T>(override?: ResponseParser<T>): ResponseType<T> | undefined {
        const parseReturn = override ?? this.parser;
        let parser: ResponseType<T> | undefined;
        if (parseReturn) {
            const type = typeof parseReturn;
            if (type === 'function') {
                parser = parseReturn as ResponseType<T>;
            }
            else if (typeof parseReturn === 'string') {
                parser = responseParsers[parseReturn] as ResponseType<T> | undefined;
            }
        }

        return parser;
    }

    dispose = () => this.client?.dispose();
}

