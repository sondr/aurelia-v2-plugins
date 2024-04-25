import { DI } from "@aurelia/kernel";
import { ApiEndpoint, ApiEndpointClientConfig } from "./api-endpoint";
import { ResponseParser } from "./interfaces";

export const IApiContainer = DI.createInterface<ApiContainer>("IAuthService", x => x.singleton(ApiContainer));
export type IApiContainer = ApiContainer;

export class ApiContainer {
    private defaultEndpoint: string;
    private readonly endpoints: { [name: string]: ApiEndpoint } = {};

    public getEndpointNames() {
        return Object.keys(this.endpoints);
    }

    public getEndpoint(name?: string) {
        return this.endpoints[name ?? this.defaultEndpoint];
    }

    public registerEndpoint(name: string, clientConfig: ApiEndpointClientConfig, parser?: ResponseParser<any>) {
        if (this.exists(name)) {
            throw new Error(`Endpoint ${name} already exists`);
        }

        this.endpoints[name] = new ApiEndpoint(clientConfig, parser);
    }

    public exists(name: string) { return !!this.endpoints[name]; }

    setDefaultEndpoint(name: string) {
        this.defaultEndpoint = name;
    }
}
