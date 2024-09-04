import { newInstanceOf, IContainer } from '@aurelia/kernel';
import { HttpClientConfiguration, IHttpClient } from '@aurelia/fetch-client';
import { IRestFetchOptions as IApiRequestOptions, HttpMethods, IRestRequestData as IApiRequestData, IRestFetchRequestOptions as IApiFullRequestOptions, RequestBody } from './interfaces';
import { buildUrl } from './utilities';
import { StreamParser, streamParsers } from './parsers/stream-parsers';


const prepareRequestBody = (body: RequestBody, convertToJson = true) =>
    (convertToJson && body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)
        && !(body instanceof Blob) && !(body instanceof ArrayBuffer) && !(body instanceof ReadableStream))
        ? JSON.stringify(body)
        : body;

//export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => HttpClientConfiguration);
export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => void);

export class ApiEndpoint {
    public readonly client: IHttpClient;

    public convertToJson = true;

    constructor(
        readonly container: IContainer,
        config: ApiEndpointClientConfig,
        private defaultStreamParser: StreamParser<any> = 'text'
    ) {
        this.client = this.container.get(newInstanceOf(IHttpClient));
        this.client?.configure(config);
    }

    public get<T>(resource: string, options?: IApiRequestOptions<T>) {
        return this.request<T>('GET', resource, options);
    }
    public post<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>) {
        (options as IApiFullRequestOptions<T>).body = prepareRequestBody(body, this.convertToJson);
        return this.request<T>('POST', resource, options);
    }
    public patch<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>) {
        (options as IApiFullRequestOptions<T>).body = prepareRequestBody(body, this.convertToJson);
        return this.request<T>('PATCH', resource, options);
    }
    public put<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>) {
        (options as IApiFullRequestOptions<T>).body = prepareRequestBody(body, this.convertToJson);
        return this.request<T>('PUT', resource, options);
    }
    public delete<T>(resource: string, options?: IApiRequestOptions<T>) {
        return this.request<T>('DELETE', resource, options);
    }

    public request<T>(method: HttpMethods, resource: string, options?: IApiFullRequestOptions<T>): ApiResponse<T> {
        const requestData = this.buildRequest(method, resource, options);
        if (options?.beforeSend) { options.beforeSend(requestData); }
        const responseTask = this.client.fetch(requestData.resource, requestData.request);

        return new ApiResponse<T>(requestData, responseTask, options?.streamParser ?? this.defaultStreamParser);
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

    dispose = () => this.client?.dispose();
}

//interface

class ApiResponse<T> {
    constructor(
        public readonly request: IApiRequestData,
        private readonly responsePromise: Promise<Response>,
        private readonly streamParser: StreamParser<T>
    ) { }

    private response: Response;

    // Utility method to ensure response is resolved before accessing properties
    public async getHttpResponse(): Promise<Response> {
        if (!this.response) { this.response = await this.responsePromise; }
        return this.response;
    }

    public async stream(onChunk: (chunk: T) => void, sp: StreamParser<T> = null): Promise<void> {
        const response = await this.getHttpResponse();

        sp = sp ?? this.streamParser;
        const streamParser = typeof sp === 'string' ? streamParsers[sp] : sp;

        await streamParser(response, onChunk);
    }

    public async json(): Promise<T> {
        const response = await this.getHttpResponse();
        return response.json() as Promise<T>;
    }

    public async text(): Promise<string> {
        const response = await this.getHttpResponse();
        return response.text();
    }

    public async blob(): Promise<Blob> {
        const response = await this.getHttpResponse();
        return response.blob();
    }

    public async clone(): Promise<ApiResponse<T>> {
        const response = await this.getHttpResponse();
        return new ApiResponse<T>(
            this.request,
            Promise.resolve(response.clone()),
            this.streamParser
        );
    }

    public async ok(): Promise<boolean> {
        const response = await this.getHttpResponse();
        return response.ok;
    }

    public async status(): Promise<number> {
        const response = await this.getHttpResponse();
        return response.status;
    }

    public async statusText(): Promise<string> {
        const response = await this.getHttpResponse();
        return response.statusText;
    }

    public async headers(): Promise<Headers> {
        const response = await this.getHttpResponse();
        return response.headers;
    }

    public async url(): Promise<string> {
        const response = await this.getHttpResponse();
        return response.url;
    }
}