export interface IRestFetchOptions<T> {
    query?: Object;
    body?: any;
    headers?: HeadersInit;
    beforeSend?: (request: IRestRequestData) => void;
    beforeReturn?: ResponseParser<T>;
}
export interface IRestRequestData {
    resource: string;
    request: RequestInit;
}
export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' | string & {};
export type ResponseType<T> = (response: Response) => Promise<T>;
export interface IResponseParsers {
    disable: undefined;
    text: ResponseType<string>;
    json: ResponseType<any>;
    blob: ResponseType<Blob>;
    formData: ResponseType<FormData>;
}
export declare const responseParsers: IResponseParsers;
export declare const parserKeys: string[];
export type ResponseParser<T> = (keyof typeof responseParsers) | undefined | ResponseType<T> | 'disable';
//# sourceMappingURL=interfaces.d.ts.map