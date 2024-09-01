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

  async fetch() {
    console.log("find data");
    console.log("shoudl get data from api");
    // console.log(this.apiContainer);

    // const ghEndpoint = this.apiContainer.getEndpoint(EndPoints.github);
    // const mapEndpoint = this.apiContainer.getEndpoint(EndPoints.counties);

    this.mapApi.get('', {
      stream: {
        parser: streamParses.default,
        onChunk: (chunk) => {
          console.log(chunk);
        }
      }
    });

    const users = await this.githubApi.get('/users/aurelia');
    const counties = await this.mapApi.get('/fylkerkommuner');


    console.log(users);
    console.log(counties);
  }

}
