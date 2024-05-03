import { resolve } from 'aurelia';
import { IApiContainer } from 'aurelia2-simple-api';
import { EndPoints } from '../main';

export class HomePage {
    private readonly apiContainer = resolve(IApiContainer);

    async findData() {
        console.log("find data");
        console.log("shoudl get data from api");
        console.log(this.apiContainer);

        const ghEndpoint = this.apiContainer.getEndpoint(EndPoints.github);
        const mapEndpoint = this.apiContainer.getEndpoint(EndPoints.counties);

        const users = await ghEndpoint.get('/users/robinck');
        const counties = await mapEndpoint.get('/fylkerkommuner');

        
        console.log(users);
        console.log(counties);
    }
}