const defaultOnChunk = async (response: Response, onStreamChunk: (chunk: ArrayBufferView) => void) => {
    const reader = response.body?.getReader();
    if (reader) {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            onStreamChunk(value as ArrayBufferView); // Pass the raw chunk to the callback
        }
    } else {
        throw new Error('The response does not contain a readable stream.');
    }
};

const processTextStream = async (
    response: Response,
    processChunk: (chunk: string) => void
) => {
    await defaultOnChunk(response, (value) => {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(value, { stream: true });
        let buffer = text;

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const chunk = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            if (chunk) {
                processChunk(chunk);  // Process each decoded chunk
            }
        }

        // Process any remaining text in the buffer
        if (buffer) {
            processChunk(buffer);
        }
    });
};

export type StreamParserType<T> = (response: Response, onStreamChunk: (chunk: T) => void) => Promise<void>;
export interface IStreamParsers {
    default: StreamParserType<unknown>;
    text: StreamParserType<string>;
    json: StreamParserType<object>;
}
export const streamParsers: IStreamParsers = {
    default: defaultOnChunk,
    text: async (response: Response, onStreamChunk: (chunk: string) => void) => {
        await processTextStream(response, (chunk) => {
            onStreamChunk(chunk);  // Call the provided callback with the text chunk
        });
    },

    json: async (response: Response, onStreamChunk: (chunk: object) => void) => {
        await processTextStream(response, (chunk) => {
            try {
                const jsonObject = JSON.parse(chunk);
                onStreamChunk(jsonObject);  // Call the provided callback with the parsed JSON object
            } catch (error) {
                console.error('Error parsing JSON chunk:', chunk);
            }
        });
    }
};

export const parserKeys = Object.keys(streamParsers);
export type StreamParser<T> = (keyof typeof streamParsers) | undefined | StreamParserType<T>;

//export type parserConfig = () => void;