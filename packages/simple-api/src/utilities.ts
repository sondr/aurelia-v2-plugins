export function buildUrl(resource: string, queryParams?: object) {
    const appendEnd = resource.slice(-1) === '/' ? '/' : '';

    if (queryParams) {
        resource += `?${buildQueryParameters(queryParams)}`;
    }

    return resource + appendEnd;
}

export function buildQueryParameters(params: Object, prefix: string = ''): string {
    const queryParts: string[] = [];

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            let fullKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);

            if (value !== null && typeof value === "object") {
                // Recursive call for nested objects
                queryParts.push(buildQueryParameters(value, fullKey));
            } else {
                // Encode value to handle special characters
                const encodedValue = encodeURIComponent(value);
                queryParts.push(`${fullKey}=${encodedValue}`);
            }
        }
    }

    return queryParts.join('&');
}