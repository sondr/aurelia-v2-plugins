import { PLATFORM } from "aurelia";
export class BaseConfig {
    constructor() {
        this.storage = PLATFORM.globalThis.localStorage;
    }
}
//# sourceMappingURL=base-config.js.map