import { newInstanceOf } from '@aurelia/kernel';
import { IHttpClient } from '@aurelia/fetch-client';
import { buildUrl } from './utilities';
import { streamParsers } from './parsers/stream-parsers';
const findStreamParser = (sp = null) => {
};
const prepareRequestBody = (body, convertToJson = true) => (convertToJson && body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)
    && !(body instanceof Blob) && !(body instanceof ArrayBuffer) && !(body instanceof ReadableStream))
    ? JSON.stringify(body)
    : body;
export class ApiEndpoint {
    constructor(container, config, defaultStreamParser = 'text') {
        this.container = container;
        this.defaultStreamParser = defaultStreamParser;
        this.convertToJson = true;
        this.dispose = () => this.client?.dispose();
        this.client = this.container.get(newInstanceOf(IHttpClient));
        this.client?.configure(config);
    }
    get(resource, options) {
        return this.request('GET', resource, options);
    }
    post(resource, body, options) {
        options.body = prepareRequestBody(body, this.convertToJson);
        return this.request('POST', resource, options);
    }
    patch(resource, body, options) {
        options.body = prepareRequestBody(body, this.convertToJson);
        return this.request('PATCH', resource, options);
    }
    put(resource, body, options) {
        options.body = prepareRequestBody(body, this.convertToJson);
        return this.request('PUT', resource, options);
    }
    delete(resource, options) {
        return this.request('DELETE', resource, options);
    }
    request(method, resource, options) {
        const requestData = this.buildRequest(method, resource, options);
        if (options?.beforeSend) {
            options.beforeSend(requestData);
        }
        const responseTask = this.client.fetch(requestData.resource, requestData.request);
        return new ApiResponse(requestData, responseTask, options?.streamParser ?? this.defaultStreamParser);
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
}
//interface
class ApiResponse {
    constructor(request, responsePromise, streamParser) {
        this.request = request;
        this.responsePromise = responsePromise;
        this.streamParser = streamParser;
    }
    // Utility method to ensure response is resolved before accessing properties
    async getHttpResponse() {
        if (!this.response) {
            this.response = await this.responsePromise;
        }
        return this.response;
    }
    async stream(onChunk, sp = null) {
        const response = await this.getHttpResponse();
        sp = sp ?? this.streamParser;
        const streamParser = typeof sp === 'string' ? streamParsers[sp] : sp;
        await streamParser(response, onChunk);
    }
    async json() {
        const response = await this.getHttpResponse();
        return response.json();
    }
    async text() {
        const response = await this.getHttpResponse();
        return response.text();
    }
    async blob() {
        const response = await this.getHttpResponse();
        return response.blob();
    }
    async clone() {
        const response = await this.getHttpResponse();
        return new ApiResponse(this.request, Promise.resolve(response.clone()), this.streamParser);
    }
    async ok() {
        const response = await this.getHttpResponse();
        return response.ok;
    }
    async status() {
        const response = await this.getHttpResponse();
        return response.status;
    }
    async statusText() {
        const response = await this.getHttpResponse();
        return response.statusText;
    }
    async headers() {
        const response = await this.getHttpResponse();
        return response.headers;
    }
    async url() {
        const response = await this.getHttpResponse();
        return response.url;
    }
}
//# sourceMappingURL=api-endpoint.js.map