import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { apiConfiguration } from 'aurelia2-simple-api';
import { MyApp } from './my-app';

export enum EndPoints {
  github = 'github'
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
        return config;
      });
    })
    // apiConfiguration.setup(cfg => {
    //   cfg.registerEndpoint(EndPoints.github, {
    //     baseUrl: 'https://api.github.com',
    //     headers: {
    //       'Accept': 'application/json'
    //     }
    //   });
    // })
  )
  .app(MyApp)
  .start();