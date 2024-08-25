import { IContainer, IRegistry } from '@aurelia/kernel';
import { ApiService, IApiService } from './api-service';
import { IRestFetchOptions, IRestRequestData } from './interfaces';

const defaultComponents: IRegistry[] = [
    IApiService as unknown as IRegistry
];

interface IApiRegistry extends IRegistry {
    setup(config: (apiContainer: ApiService) => void): IApiRegistry;
}

function createConfiguration(config?: (apiServiceOptions: ApiService) => void): IApiRegistry {
    return {
        register(container: IContainer) {            
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

export {
    IApiService as IApiContainer,
    IRestFetchOptions,
    IRestRequestData
}