import { IHttpClient, DI, HttpClientConfiguration } from 'aurelia';
import { IRoute, IRouteableComponent, routes } from '@aurelia/router';


import { HomePage } from './routes/home';
import { NextRoute } from './routes/next';
import { IApiContainer } from 'aurelia2-simple-api';
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
  // constructor(@IHttpClient private httpClient: IHttpClient) { }
  // async fetch() {
  //   const users = await this.httpClient.get('https://api.github.com/users');
  //   console.log(users);
  //   const json = await users.json();
  //   console.log(json);
  // }

  constructor(
    @IHttpClient private httpClient: IHttpClient,
    @IApiContainer private apiContainer: IApiContainer
  ) { }

  async fetch() {
    try {
      this.fetch2();
    } catch (err) { }
    // try { 
    //   this.api();
    // } catch (err) { }
  }

  async fetch2() {
    // this.httpClient.configure(<HttpClientConfiguration>{
    //   baseUrl: 'https://api.github.com',
    //   dispatcher: null
    // });
    const config = new HttpClientConfiguration();
    config.withBaseUrl('https://api.github.com');
    //const node = new Node();
    config.withDispatcher(null);
    //config.baseUrl = 'https://api.github.com';
    config.dispatcher = null;
    //config.headers = {  'Accept': 'application/json' };
    this.httpClient.configure(config);
    
    const users = await this.httpClient.get('/users');
    //const users = await this.httpClient.get('https://api.github.com/users');
    console.log(users);
    const json = await users.json();
    console.log(json);
  }

  // async api() {
  //   console.log("shoudl get data from api");
  //   console.log(this.apiContainer);
  //   const endpoint = this.apiContainer.getEndpoint(EndPoints.github);
  //   console.log(endpoint);

  //   const users = await endpoint.get<any[]>('/users');
  //   console.log(users);
  // }



  // static routes: IRoute[] = [
  //   {
  //     path: '',
  //     component: HomeRoute,
  //     //component: new HomeRoute(),
  //     title: 'Home'
  //   },
  //   {
  //     path: 'next',
  //     component: NextRoute,
  //     title: 'Next',
  //   }
  // ];
}

// interface IReturnValue{
//   "login": string,
//   "id": 1,
//   "node_id": "MDQ6VXNlcjE=",
//   "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/mojombo",
//   "html_url": "https://github.com/mojombo",
//   "followers_url": "https://api.github.com/users/mojombo/followers",
//   "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
//   "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
//   "organizations_url": "https://api.github.com/users/mojombo/orgs",
//   "repos_url": "https://api.github.com/users/mojombo/repos",
//   "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/mojombo/received_events",
//   "type": "User",
//   "site_admin": false
// }