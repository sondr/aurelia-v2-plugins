import { IContainer } from '@aurelia/kernel';
import { HttpClientConfiguration, IHttpClient } from '@aurelia/fetch-client';
import { ResponseType, ResponseParser, IRestFetchOptions } from './interfaces';
export type ApiEndpointClientConfig = ((config: HttpClientConfiguration) => void);
export declare class ApiEndpoint {
    readonly container: IContainer;
    readonly client: IHttpClient;
    parser?: ResponseType<unknown>;
    constructor(container: IContainer, config: ApiEndpointClientConfig, parser?: ResponseParser<unknown>);
    setParser(parser: ResponseParser<unknown>): void;
    get<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T>;
    post<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T>;
    patch<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T>;
    put<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T>;
    delete<T>(resource: string, options?: IRestFetchOptions<T>): Promise<T>;
    private request;
    private buildRequest;
    private findParser;
    dispose(): void;
}
//# sourceMappingURL=api-endpoint.d.ts.map