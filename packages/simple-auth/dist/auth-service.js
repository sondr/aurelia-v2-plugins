import { DI } from "@aurelia/kernel";
export const IAuthService = DI.createInterface(x => x.singleton(AuthService));
export class AuthService {
    setContainer(container) {
        this.container = container;
    }
}
//# sourceMappingURL=auth-service.js.map