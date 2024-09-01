export const responseParsers = {
    disable: undefined,
    text: (response) => response.text(),
    json: (response) => response.json(),
    blob: (response) => response.blob(),
    formData: (response) => response.formData()
};
export const parserKeys = Object.keys(responseParsers);
//# sourceMappingURL=response-parsers.js.map