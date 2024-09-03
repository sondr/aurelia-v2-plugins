export type StreamParserType<T> = (response: Response, onStreamChunk: (chunk: T) => void) => Promise<void>;
export interface IStreamParsers {
    default: StreamParserType<unknown>;
    text: StreamParserType<string>;
    json: StreamParserType<object>;
}
export declare const streamParsers: IStreamParsers;
export declare const parserKeys: string[];
export type StreamParser<T> = (keyof typeof streamParsers) | undefined | StreamParserType<T>;
//# sourceMappingURL=stream-parsers.d.ts.map