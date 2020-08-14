<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /
  </a>
</p>

# NestJS Telegraf
![npm](https://img.shields.io/npm/dm/nestjs-telegraf)
![GitHub last commit](https://img.shields.io/github/last-commit/bukhalo/nestjs-telegraf)
![NPM](https://img.shields.io/npm/l/nestjs-telegraf)

[Telegraf](https://github.com/telegraf/telegraf) module for [NestJS](https://github.com/nestjs/nest).

## Installation

```bash
$ npm i nestjs-telegraf
```

Once the installation process is complete, we can import the TelegrafModule into the root AppModule.

```typescript
/* app.module.ts */

import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: 'TELEGRAM_BOT_TOKEN',
    })
  ],
})
export class AppModule {}
```

The `forRoot()` method accepts the same configuration object as Telegraf class constructor from the Telegraf package, as described [here](https://telegraf.js.org/#/?id=constructor).

## Telegraf methods

Each Telegraf instance method described [here](https://telegraf.js.org/#/?id=telegraf) has own decorator in `nestjs-telegraf` package. The name of the decorator corresponds to the name of the Telegraf method and starts with `Telegraf`. For example [`@TelegrafHears`](https://telegraf.js.org/#/?id=hears), [`@TelegrafOn`](https://telegraf.js.org/#/?id=on), [`@TelegrafAction`](https://telegraf.js.org/#/?id=action) and so on.

Now let's try to repeat the example from the Telegraf [documentation page](https://telegraf.js.org/#/?id=example).

```typescript
/* app.service.ts */

import { Injectable } from '@nestjs/common';
import {
  Start,
  Help,
  On,
  Hears,
  Context,
} from 'nestjs-telegraf';

@Injectable()
export class AppService {
  @Start()
  start(ctx: Context) {
    ctx.reply('Welcome');
  }

  @Help()
  help(ctx: Context) {
    ctx.reply('Send me a sticker');
  }

  @On('sticker')
  on(ctx: Context) {
    ctx.reply('👍');
  }

  @Hears('hi')
  hears(ctx: Context) {
    ctx.reply('Hey there');
  }
}
```

## Bot injection
At times you may need to access the native `Telegraf` instance. For example, you may want to connect stage middleware. You can inject the Telegraf by using the `@InjectBot()` decorator as follows:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectBot, TelegrafProvider } from 'nestjs-telegraf';

@Injectable()
export class BotSettingsService {
  constructor(@InjectBot() private bot: TelegrafProvider) {}
}
```


## Async configuration
When you need to pass module options asynchronously instead of statically, use the forRootAsync() method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
TelegrafModule.forRootAsync({
  useFactory: () => ({
    token: 'TELEGRAM_BOT_TOKEN',
  }),
});
```

Like other [factory providers](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory), our factory function can be async and can inject dependencies through inject.

```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule.forFeature(telegrafModuleConfig)],
  useFactory: async (configService: ConfigService) => ({
    token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
  }),
  inject: [ConfigService],
});
```

Alternatively, you can configure the TelegrafModule using a class instead of a factory, as shown below:

```typescript
TelegrafModule.forRootAsync({
  useClass: TelegrafConfigService,
});
```

The construction above instantiates `TelegrafConfigService` inside `TelegrafModule`, using it to create the required options object. Note that in this example, the `TelegrafConfigService` has to implement the `TelegrafOptionsFactory` interface, as shown below. The `TelegrafModule` will call the `createTelegrafOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class TelegrafConfigService implements TelegrafOptionsFactory {
  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: 'TELEGRAM_BOT_TOKEN',
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `TelegrafModule`, use the `useExisting` syntax.

```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule.forFeature(telegrafModuleConfig)],
  useExisting: ConfigService,
});
```

## Webhooks
If you want to configure a telegram bot webhook, you need to get a middleware from `TelegrafProvider` for connect it in your `main.ts` file.
 
To access it, you must use the `app.get()` method, followed by the provider reference:
```typescript
const telegrafProvider = app.get('TelegrafProvider');
```

Now you can connect middleware:
```typescript
app.use(telegrafProvider.webhookCallback('/secret-path'));
```

The last step is to specify launchOptions in `forRoot` method:
```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule.forFeature(telegrafModuleConfig)],
  useFactory: async (configService: ConfigService) => ({
    token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
    launchOptions: {
      webhook: {
        domain: 'domain.tld',
        hookPath: '/secret-path',
      }
    }
  }),
  inject: [ConfigService],
});
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## People

- Authors - [Aleksandr Bukhalo](https://bukhalo.com/) & [Igor Kamyshev](https://kamyshev.me/)
- Maintainers - [Aleksandr Bukhalo](https://bukhalo.com/)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Sedjj"><img src="https://avatars3.githubusercontent.com/u/5383030?v=4" width="100px;" alt=""/><br /><sub><b>Eldar Salimzebarov</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/issues?q=author%3ASedjj" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.ismb.it/vito.macchia"><img src="https://avatars3.githubusercontent.com/u/2249342?v=4" width="100px;" alt=""/><br /><sub><b>Vito Macchia</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/commits?author=lamuertepeluda" title="Code">💻</a> <a href="https://github.com/bukhalo/nestjs-telegraf/issues?q=author%3Alamuertepeluda" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/edgesite"><img src="https://avatars3.githubusercontent.com/u/10336620?v=4" width="100px;" alt=""/><br /><sub><b>KITAHARA SETSUNA</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/commits?author=edgesite" title="Code">💻</a> <a href="https://github.com/bukhalo/nestjs-telegraf/issues?q=author%3Aedgesite" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://bukhalo.com/"><img src="https://avatars2.githubusercontent.com/u/14031838?v=4" width="100px;" alt=""/><br /><sub><b>Aleksandr Bukhalo</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/commits?author=bukhalo" title="Code">💻</a> <a href="https://github.com/bukhalo/nestjs-telegraf/commits?author=bukhalo" title="Documentation">📖</a> <a href="https://github.com/bukhalo/nestjs-telegraf/pulls?q=is%3Apr+reviewed-by%3Abukhalo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/VyacheslavSaloidWork"><img src="https://avatars3.githubusercontent.com/u/43011265?v=4" width="100px;" alt=""/><br /><sub><b>Vyacheslav Saloid</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/issues?q=author%3AVyacheslavSaloidWork" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
