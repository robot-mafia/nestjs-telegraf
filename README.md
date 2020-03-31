<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

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
  TelegrafStart,
  TelegrafHelp,
  TelegrafOn,
  TelegrafHears,
  ContextMessageUpdate,
} from 'nestjs-telegraf';

@Injectable()
export class AppService {
  @TelegrafStart()
  start(ctx: ContextMessageUpdate) {
    ctx.reply('Welcome');
  }

  @TelegrafHelp()
  help(ctx: ContextMessageUpdate) {
    ctx.reply('Send me a sticker');
  }

  @TelegrafOn('sticker')
  on(ctx: ContextMessageUpdate) {
    ctx.reply('👍');
  }

  @TelegrafHears('hi')
  hears(ctx: ContextMessageUpdate) {
    ctx.reply('Hey there');
  }
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
  imports: [ConfigModule],
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
  createMongooseOptions(): TelegrafModuleOptions {
    return {
      token: 'TELEGRAM_BOT_TOKEN',
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `TelegrafModule`, use the `useExisting` syntax.

```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
});
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## People

- Authors - [robotmafia Inc.](https://robotmafia.io) & [Aleksandr Bukhalo](https://bukhalo.com/) & [Igor Kamyshev](https://kamyshev.me/)
- Maintainers - [robotmafia Inc.](https://robotmafia.io/)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
