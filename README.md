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

## People

- Authors - [robotmafia Inc.](https://robotmafia.io) & [Aleksandr Bukhalo](https://bukhalo.com/) & [Igor Kamyshev](https://kamyshev.me/)
- Maintainers - [robotmafia Inc.](https://robotmafia.io/)
