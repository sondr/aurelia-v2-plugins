// import { IContainer, IRegistry } from '@aurelia/kernel';
// import { ApiContainer, IApiContainer } from './api-container';
// import { IRestFetchOptions, IRestRequestData } from './interfaces';

// const defaultComponents: IRegistry[] = [
//     IApiContainer as unknown as IRegistry
// ];

// interface IApiRegistry extends IRegistry {
//     setup(config: (apiContainer: ApiContainer) => void): IApiRegistry;
// }

// function createConfiguration(config?: (apiContainer: ApiContainer) => void): IApiRegistry {
//     return {
//         register(container: IContainer) {            
//             const instance = container.get(IApiContainer);
//             instance.setContainer(container);
//             if (config) {
//                 config(instance);
//             }

//             container.register(...defaultComponents);
//             return container;
//         },
//         setup(options) {
//             return createConfiguration(options);
//         }
//     };
// }

// export const apiConfiguration = createConfiguration();

// export {
//     IApiContainer,
//     IRestFetchOptions,
//     IRestRequestData
// }