import { IContainer, IRegistry, Registration } from '@aurelia/kernel';
import { IApiContainer } from './api-container';
import { IRestFetchOptions, IRestRequestData } from './interfaces';

const defaultComponents: IRegistry[] = [
    //ApiContainer as unknown as IRegistry
];

interface IApiRegistry extends IRegistry {
    setup(config: (apiContainer: IApiContainer) => void): IApiRegistry;
}

function createConfiguration(config?: (apiContainer: IApiContainer) => void): IApiRegistry {
    return {
        register(container: IContainer) {
            const apiContainer = container.get(IApiContainer);

            if (config) {
                config(apiContainer);
            }

            return container.register(...defaultComponents)
        },
        setup(options) {
            return createConfiguration(options);
        }
    };
}

export const apiConfiguration = createConfiguration();

// apiConfiguration.configure(cfg => {
//     cfg.registerEndpoint('test', {
//         baseUrl: 'http://localhost:3000',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }, 'json');
// });

export {
    IApiContainer,
    IRestFetchOptions,
    IRestRequestData
}