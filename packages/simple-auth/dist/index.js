import { IAuthService } from './auth-service';
const defaultComponents = [
//IApiContainer as unknown as IRegistry
];
// interface IApiRegistry extends IRegistry {
//     setup(config: (options: AuthService) => void): IApiRegistry;
// }
function createConfiguration(config) {
    return {
        register(container) {
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
//# sourceMappingURL=index.js.map