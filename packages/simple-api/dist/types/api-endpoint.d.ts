import { IContainer } from '@aurelia/kernel';
import { HttpClientConfiguration, IHttpClient } from '@aurelia/fetch-client';
import { IRestFetchOptions as IApiRequestOptions, RequestBody } from './interfaces';
import { ResponseParser, ResponseType } from './parsers/response-parsers';
export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => void);
export declare class ApiEndpoint {
    readonly container: IContainer;
    readonly client: IHttpClient;
    parser?: ResponseType<unknown>;
    convertToJson: boolean;
    constructor(container: IContainer, config: ApiEndpointClientConfig, parser?: ResponseParser<unknown>);
    setParser(parser: ResponseParser<unknown>): void;
    get<T>(resource: string, options?: IApiRequestOptions<T>): Promise<T>;
    post<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): Promise<T>;
    patch<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): Promise<T>;
    put<T>(resource: string, body: RequestBody, options?: IApiRequestOptions<T>): Promise<T>;
    delete<T>(resource: string, options?: IApiRequestOptions<T>): Promise<T>;
    private request;
    private buildRequest;
    private findParser;
    dispose: () => void;
}
//# sourceMappingURL=api-endpoint.d.ts.map