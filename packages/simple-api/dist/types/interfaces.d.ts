import { StreamParser } from "./parsers/stream-parsers";
export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' | string & {};
export type RequestBody = unknown | object | BodyInit | null | undefined;
export interface IRestFetchRequestOptions<T> extends IRestFetchOptions<T> {
    body?: RequestBody;
}
export interface IRestFetchOptions<T> {
    query?: object;
    headers?: HeadersInit;
    beforeSend?: (request: IRestRequestData) => void;
    streamParser?: StreamParser<T>;
}
export interface IRestRequestData {
    resource: string;
    request: RequestInit;
}
//# sourceMappingURL=interfaces.d.ts.map