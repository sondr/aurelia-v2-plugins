import { IContainer, IRegistry } from '@aurelia/kernel';
import { IAuthService } from './auth-service';

const defaultComponents: IRegistry[] = [
    //IApiContainer as unknown as IRegistry
];

// interface IApiRegistry extends IRegistry {
//     setup(config: (options: AuthService) => void): IApiRegistry;
// }

function createConfiguration(config?: (authServiceOptions: unknown) => void): IRegistry {
    return {
        register(container: IContainer) {
            const instance = container.get(IAuthService);
            instance.setContainer(container);
            if (config) {
                config(instance);
            }

            container.register(...defaultComponents);
            return container;
        }
        // ,
        // setup(options) {
        //     return createConfiguration(options);
        // }
    };
}

export const authConfiguration = createConfiguration();

export {
}