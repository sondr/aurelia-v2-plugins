import { PLATFORM } from "aurelia";


export class BaseConfig{
    storage: Storage = PLATFORM.globalThis.localStorage;
}