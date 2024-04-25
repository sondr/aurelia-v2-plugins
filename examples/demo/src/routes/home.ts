import { IApiContainer } from 'aurelia2-simple-api';
import { EndPoints } from '../main';

export class HomePage {
    constructor(
        @IApiContainer private apiContainer: IApiContainer
    ) { }

    async fetch() {
        console.log("shoudl get data from api");
        console.log(this.apiContainer);
        const endpoint = this.apiContainer.getEndpoint(EndPoints.github);
        console.log(endpoint);

        const users = await endpoint.get<{ message: string }>('/users/robinck');
        console.log(users.message);
    }
}