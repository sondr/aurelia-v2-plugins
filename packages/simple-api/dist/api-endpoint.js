import { newInstanceOf } from '@aurelia/kernel';
import { IHttpClient } from '@aurelia/fetch-client';
import { responseParsers } from './parsers/response-parsers';
import { buildUrl } from './utilities';
import { streamParsers } from './parsers/stream-parsers';
export class ApiEndpoint {
    constructor(container, config, parser = 'json') {
        this.container = container;
        this.client = this.container.get(newInstanceOf(IHttpClient));
        this.client?.configure(config);
        this.setParser(parser);
    }
    setParser(parser) {
        this.parser = this.findParser(parser);
    }
    get(resource, options) {
        return this.request('GET', resource, options);
    }
    post(resource, options) {
        return this.request('POST', resource, options);
    }
    patch(resource, options) {
        return this.request('PATCH', resource, options);
    }
    put(resource, options) {
        return this.request('PUT', resource, options);
    }
    delete(resource, options) {
        return this.request('DELETE', resource, options);
    }
    async request(method, resource, options) {
        const requestData = this.buildRequest(method, resource, options);
        if (options?.beforeSend) {
            options.beforeSend(requestData);
        }
        const request = this.client.fetch(requestData.resource, requestData.request);
        const response = await request;
        const onStreamChunck = options?.stream?.onChunk;
        if (onStreamChunck) {
            const streamParser = options?.stream?.parser ?? streamParsers.default;
            await streamParser(response, onStreamChunck);
        }
        const responseParser = this.findParser(options?.responseParser);
        if (!responseParser) {
            return response;
        }
        return responseParser(response);
    }
    buildRequest(method, resource, options) {
        const request = this.client?.defaults ? structuredClone(this.client.defaults) : {};
        request.method = method;
        return {
            resource,
            url: buildUrl(resource, options?.query),
            request
        };
    }
    findParser(override) {
        const parseReturn = override ?? this.parser;
        let parser;
        if (parseReturn) {
            const type = typeof parseReturn;
            if (type === 'function') {
                parser = parseReturn;
            }
            else if (typeof parseReturn === 'string') {
                parser = responseParsers[parseReturn];
            }
        }
        return parser;
    }
    dispose() {
        this.client?.dispose();
    }
}
//# sourceMappingURL=api-endpoint.js.map