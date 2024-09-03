import { IContainer } from '@aurelia/kernel';
import { HttpClientConfiguration, IHttpClient } from '@aurelia/fetch-client';
import { IRestFetchOptions as IApiRequestOptions, HttpMethods, IRestRequestData as IApiRequestData, IRestFetchRequestOptions as IApiFullRequestOptions, RequestBody } from './interfaces';
import { StreamParser } from './parsers/stream-parsers';
export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => void);
export declare class ApiEndpoint {
    readonly container: IContainer;
    private defaultStreamParser;
    readonly client: IHttpClient;
    convertToJson: boolean;
    constructor(container: IContainer, config: ApiEndpointClientConfig, defaultStreamParser?: StreamParser<any>);
    get<T>(resource: string, options?: IApiRequestOptions<T>): ApiResponse<T>;
    post<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): ApiResponse<T>;
    patch<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): ApiResponse<T>;
    put<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): ApiResponse<T>;
    delete<T>(resource: string, options?: IApiRequestOptions<T>): ApiResponse<T>;
    request<T>(method: HttpMethods, resource: string, options?: IApiFullRequestOptions<T>): ApiResponse<T>;
    private buildRequest;
    dispose: () => void;
}
declare class ApiResponse<T> {
    readonly request: IApiRequestData;
    private readonly responsePromise;
    private readonly streamParser;
    constructor(request: IApiRequestData, responsePromise: Promise<Response>, streamParser: StreamParser<T>);
    private response;
    getHttpResponse(): Promise<Response>;
    stream(onChunk: (chunk: T) => void, sp?: StreamParser<T>): Promise<void>;
    json(): Promise<T>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    clone(): Promise<ApiResponse<T>>;
    ok(): Promise<boolean>;
    status(): Promise<number>;
    statusText(): Promise<string>;
    headers(): Promise<Headers>;
    url(): Promise<string>;
}
export {};
//# sourceMappingURL=api-endpoint.d.ts.map