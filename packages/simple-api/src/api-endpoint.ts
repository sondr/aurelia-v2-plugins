import { HttpClient, HttpClientConfiguration } from '@aurelia/fetch-client';
import { ResponseType, ResponseParser, IRestFetchOptions, HttpMethods, IRestRequestData, responseParsers } from './interfaces';
import { buildUrl } from './utilities';

//export type ApiEndpointClientConfig = RequestInit | ((config: HttpClientConfiguration) => HttpClientConfiguration) | HttpClientConfiguration;
export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => HttpClientConfiguration);


export class ApiEndpoint {
    public readonly client: HttpClient;
    public parser?: ResponseType<any>;

    constructor(
        config: ApiEndpointClientConfig,
        parser: ResponseParser<any> = 'json'
    ) {
        this.client = new HttpClient();
        this.client.configure(config);

        this.setParser(parser);
    }

    public setParser(parser: ResponseParser<any>) {
        this.parser = this.findParser(parser);
    }

    public get<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T> {
        return this.request<T>('GET', resource, options) as Promise<T>;
    }
    public post<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T> {
        return this.request<T>('POST', resource, options) as Promise<T>;
    }
    public patch<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T> {
        return this.request<T>('PATCH', resource, options) as Promise<T>;
    }
    public put<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T> {
        return this.request<T>('PUT', resource, options) as Promise<T>;
    }
    public delete<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T> {
        return this.request<T>('DELETE', resource, options) as Promise<T>;
    }

    private async request<T>(method: HttpMethods, resource: string, options?: IRestFetchOptions<T>): Promise<T | Response> {
        const requestData = this.buildRequest(method, resource, options);
        if (options?.beforeSend) { options.beforeSend(requestData); }
        const request = this.client.fetch(requestData.resource, requestData.request);


        const beforeReturn = this.findParser<T>(options?.beforeReturn);
        if (!beforeReturn) {
            return request;
        }

        const response = await request;
        return beforeReturn!(response);
    }

    private buildRequest<T>(method: HttpMethods, resource: string, options?: IRestFetchOptions<T>): IRestRequestData {
        const request = this.client?.defaults ? structuredClone(this.client.defaults) : {};
        request.method = method;
        return {
            resource,
            url: buildUrl(resource, options?.query),
            request
        } as IRestRequestData;
    }

    private findParser<T>(override?: ResponseParser<T>): ResponseType<T> | undefined {
        let parseReturn = override ?? this.parser;
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

}

