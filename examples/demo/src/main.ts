import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { apiConfiguration } from 'aurelia2-simple-api';
import { MyApp } from './my-app';

export enum EndPoints {
  github = 'github',
  counties = 'counties',
}

Aurelia
  .register(
    //RouterConfiguration,
    RouterConfiguration.customize({
      fallback: import('./routes/missing'),
      useHref: false
    }),
    apiConfiguration.setup(cfg => {
      cfg.registerEndpoint(EndPoints.github, config => {
        config.baseUrl = 'https://api.github.com';
      }).registerEndpoint(EndPoints.counties, config => {
        config.baseUrl = 'https://api.kartverket.no/kommuneinfo/v1/';
      });
    })
  )
  .app(MyApp)
  .start();