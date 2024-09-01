import { streamParsers } from './parsers/stream-parsers';
import { IApiService } from './api-service';
const defaultComponents = [
    IApiService
];
function createConfiguration(config) {
    return {
        register(container) {
            const instance = container.get(IApiService);
            instance.setContainer(container);
            if (config) {
                config(instance);
            }
            container.register(...defaultComponents);
            return container;
        },
        setup(options) {
            return createConfiguration(options);
        }
    };
}
export const apiConfiguration = createConfiguration();
export { IApiService as IApiContainer, streamParsers as streamParses };
//# sourceMappingURL=index.js.map