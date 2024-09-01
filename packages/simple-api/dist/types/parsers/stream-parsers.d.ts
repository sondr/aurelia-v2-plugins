export type StreamParser<T> = (response: Response, onStreamChunk: (chunk: T) => void) => Promise<void>;
export interface IStreamParsers {
    default: StreamParser<unknown>;
    text: StreamParser<string>;
    json: StreamParser<object>;
}
export declare const streamParsers: IStreamParsers;
//# sourceMappingURL=stream-parsers.d.ts.map