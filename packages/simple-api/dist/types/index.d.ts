import { streamParsers } from './parsers/stream-parsers';
import { IRegistry } from '@aurelia/kernel';
import { ApiService, IApiService } from './api-service';
import { IRestFetchOptions, IRestRequestData } from './interfaces';
interface IApiRegistry extends IRegistry {
    setup(config: (apiContainer: ApiService) => void): IApiRegistry;
}
export declare const apiConfiguration: IApiRegistry;
export { IApiService as IApiContainer, IRestFetchOptions, IRestRequestData, streamParsers as streamParses };
//# sourceMappingURL=index.d.ts.map