import { IContainer } from "@aurelia/kernel";
import { ApiEndpoint, ApiEndpointClientConfig } from "./api-endpoint";
import { StreamParser } from "./parsers/stream-parsers";
export declare const IApiService: import("@aurelia/kernel").InterfaceSymbol<ApiService>;
export declare class ApiService {
    private defaultEndpoint;
    private readonly endpoints;
    private container;
    setContainer(container: IContainer): void;
    getEndpointNames(): string[];
    getEndpoint(name?: string): ApiEndpoint;
    getEmptyEndpoint(): ApiEndpoint;
    registerEndpoint(name: string, clientConfig: ApiEndpointClientConfig, defaultStreamParser?: StreamParser<unknown>): this;
    removeEndpoint(name: string): this;
    exists(name: string): boolean;
    setDefaultEndpoint(name: string): this;
}
//# sourceMappingURL=api-service.d.ts.map