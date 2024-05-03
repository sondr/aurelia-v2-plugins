import { DI, IContainer } from "@aurelia/kernel";
import { ApiEndpoint, ApiEndpointClientConfig } from "./api-endpoint";
import { ResponseParser } from "./interfaces";

type IApiContainer = ApiContainer;
export const IApiContainer = DI.createInterface<IApiContainer>(x => x.singleton(ApiContainer));
export class ApiContainer {
    private defaultEndpoint: string;
    private readonly endpoints: { [name: string]: ApiEndpoint } = {};

    private container: IContainer;
    setContainer(container: IContainer) {
        this.container = container;
    }

    public getEndpointNames() {
        return Object.keys(this.endpoints);
    }

    public getEndpoint(name?: string) {
        return this.endpoints[name ?? this.defaultEndpoint];
    }

    public registerEndpoint(name: string, clientConfig: ApiEndpointClientConfig, parser?: ResponseParser<unknown>) {
        if (this.exists(name)) {
            throw new Error(`Endpoint ${name} already exists`);
        }
        
        this.endpoints[name] = new ApiEndpoint(this.container, clientConfig, parser);

        return this;
    }

    public removeEndpoint(name: string) {
        const endpoint = this.endpoints[name];
        endpoint.dispose();
        delete this.endpoints[name];

        return this;
    }

    public exists(name: string) { return !!this.endpoints[name]; }

    public setDefaultEndpoint(name: string) {
        this.defaultEndpoint = name;

        return this;
    }
}
