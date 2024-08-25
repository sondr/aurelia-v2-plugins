import { DI, IContainer } from "@aurelia/kernel";

type IAuthService = AuthService;
export const IAuthService = DI.createInterface<IAuthService>(x => x.singleton(AuthService));

export class AuthService {
    private container: IContainer;
    setContainer(container: IContainer) {
        this.container = container;
    }
}