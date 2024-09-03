import { DI } from "@aurelia/kernel";
import { ApiEndpoint } from "./api-endpoint";
const empty = 'empty-json';
export const IApiService = DI.createInterface(x => x.singleton(ApiService));
export class ApiService {
    constructor() {
        this.endpoints = {};
    }
    setContainer(container) {
        this.container = container;
    }
    getEndpointNames() {
        return Object.keys(this.endpoints);
    }
    getEndpoint(name) {
        return this.endpoints[name ?? this.defaultEndpoint];
    }
    getEmptyEndpoint() {
        if (!this.exists(empty)) {
            this.registerEndpoint(empty, config => config, 'json');
        }
        return this.getEndpoint(empty);
    }
    ;
    registerEndpoint(name, clientConfig, parser) {
        if (this.exists(name)) {
            throw new Error(`Endpoint ${name} already exists`);
        }
        this.endpoints[name] = new ApiEndpoint(this.container, clientConfig, parser);
        return this;
    }
    removeEndpoint(name) {
        const endpoint = this.endpoints[name];
        endpoint.dispose();
        delete this.endpoints[name];
        return this;
    }
    exists(name) { return !!this.endpoints[name]; }
    setDefaultEndpoint(name) {
        this.defaultEndpoint = name;
        return this;
    }
}
//# sourceMappingURL=api-service.js.map