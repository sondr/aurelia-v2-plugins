export function buildUrl(resource, queryParams) {
    const appendEnd = resource.slice(-1) === '/' ? '/' : '';
    if (queryParams) {
        resource += `?${buildQueryParameters(queryParams)}`;
    }
    return resource + appendEnd;
}
export function buildQueryParameters(params, prefix = '') {
    const queryParts = [];
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            const fullKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);
            if (value !== null && typeof value === "object") {
                // Recursive call for nested objects
                queryParts.push(buildQueryParameters(value, fullKey));
            }
            else {
                // Encode value to handle special characters
                const encodedValue = encodeURIComponent(value);
                queryParts.push(`${fullKey}=${encodedValue}`);
            }
        }
    }
    return queryParts.join('&');
}
//# sourceMappingURL=utilities.js.map