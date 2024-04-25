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
export const responseParsers: IResponseParsers = {
    disable: undefined,
    text: (response: Response) => response.text(),
    json: (response: Response) => response.json(),
    blob: (response: Response) => response.blob(),
    formData: (response: Response) => response.formData()
};
export const parserKeys = Object.keys(responseParsers);

export type ResponseParser<T> = (keyof typeof responseParsers) | undefined | ResponseType<T> | 'disable';