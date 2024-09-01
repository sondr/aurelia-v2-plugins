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
//# sourceMappingURL=response-parsers.d.ts.map