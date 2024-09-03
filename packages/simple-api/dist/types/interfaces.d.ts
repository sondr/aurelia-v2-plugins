import { ResponseParser } from "./parsers/response-parsers";
import { StreamParser } from "./parsers/stream-parsers";
export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' | string & {};
export type RequestBody = BodyInit | null | undefined;
export interface IRestFetchRequestOptions<T> extends IRestFetchOptions<T> {
    body?: RequestBody;
}
export interface IRestFetchOptions<T> {
    query?: Object;
    headers?: HeadersInit;
    beforeSend?: (request: IRestRequestData) => void;
    responseParser?: ResponseParser<T>;
    stream?: IRestStreamOption<T>;
}
export interface IRestStreamOption<T> {
    parser?: StreamParser<T>;
    onChunk: (chunk: T) => void;
}
export interface IRestRequestData {
    resource: string;
    request: RequestInit;
}
//# sourceMappingURL=interfaces.d.ts.map