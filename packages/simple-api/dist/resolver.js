// import { IContainer, IResolver } from "@aurelia/kernel";
// import { ApiEndpoint } from "./api-endpoint";
// import { ApiService } from "./api-service";
// export class SimpleApiResolver implements IResolver {
//     $isResolver: true;
//     //constructor(private key: new (...args: any[]) => ApiEndpoint) {}
//     constructor(
//         private apiName: string
//     ) { }
//     resolve(handler: IContainer, requestor: IContainer): ApiEndpoint {
//         const apiContainer = handler.get(ApiService);
//         return apiContainer.getEndpoint(this.apiName);
//     }
// }
// //Usage
// //   @inject(new SimpleApiResolver('test'))
// //   export class MyClass {
// //     constructor(private service: ApiEndpoint) {
// //       // service is resolved using MyCustomResolver
// //     }
// //   }
//# sourceMappingURL=resolver.js.map