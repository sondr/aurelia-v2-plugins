import { resolve } from 'aurelia';
//import { IRoute, IRouteableComponent, routes } from '@aurelia/router';


import { HomePage } from './routes/home';
import { NextRoute } from './routes/next';
import { IApiContainer, streamParses } from 'aurelia2-simple-api';
import { EndPoints } from './main';

// @routes([
//   {
//     path: '',
//     component: HomePage,
//     //component: new HomeRoute(),
//     title: 'Home'
//   },
//   {
//     path: '/next',
//     component: NextRoute,
//     title: 'Next',
//   }
// ])
export class MyApp {
  private readonly githubApi = resolve(IApiContainer).getEndpoint(EndPoints.github);
  private readonly mapApi = resolve(IApiContainer).getEndpoint(EndPoints.counties);
  private readonly defaultApi = resolve(IApiContainer).getEmptyEndpoint();

  async fetch() {
    console.log("find data");
    console.log("shoudl get data from api");

    // console.log(this.apiContainer);
    // const ghEndpoint = this.apiContainer.getEndpoint(EndPoints.github);
    // const mapEndpoint = this.apiContainer.getEndpoint(EndPoints.counties);
    //this.mapApi.get('',);

    let data = "";
    await this.defaultApi.get('https://public.bkhengeren.no/api/v2/product/slug/pl-0720t').stream(chunk => data += chunk, streamParses.text);
    console.log(data);
    console.log(JSON.parse(data));

    //const testEmpty = await this.defaultApi.get('https://public.bkhengeren.no/api/v2/product/slug/pl-0720t').json();
    const users = await this.githubApi.get('/users/aurelia').json();
    const counties = await this.mapApi.get('/fylkerkommuner').json();

    //console.log(testEmpty);

    console.log(users);
    console.log(counties);
  }

}
