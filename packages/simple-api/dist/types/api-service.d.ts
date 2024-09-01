import { IContainer } from "@aurelia/kernel";
import { ApiEndpoint, ApiEndpointClientConfig } from "./api-endpoint";
import { ResponseParser } from "./parsers/response-parsers";
export declare const IApiService: import("@aurelia/kernel").InterfaceSymbol<ApiService>;
export declare class ApiService {
    private defaultEndpoint;
    private readonly endpoints;
    private container;
    setContainer(container: IContainer): void;
    getEndpointNames(): string[];
    getEndpoint(name?: string): ApiEndpoint;
    registerEndpoint(name: string, clientConfig: ApiEndpointClientConfig, parser?: ResponseParser<unknown>): this;
    removeEndpoint(name: string): this;
    exists(name: string): boolean;
    setDefaultEndpoint(name: string): this;
}
//# sourceMappingURL=api-service.d.ts.map