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

[Telegraf](https://github.com/telegraf/telegraf) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm i nestjs-telegraf telegraf
```

## Usage

### An example of package usage

```typescript
/* bot.module.ts */

import { Module, OnModuleInit, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule, TelegrafService } from 'nestjs-telegraf'
import botConfig from './bot.config'
import { TelegrafConfigService } from './telegraf-config.service'
import { BotService } from './bot.service'

@Module({
  imports: [
    TelegrafModule.fromFactory({
      imports: [ConfigModule.forFeature(botConfig)],
      useClass: TelegrafConfigService,
    }),
  ],
  exports: [TelegrafModule],
  providers: [BotService],
})
export class BotModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly telegrafService: TelegrafService
  ) {}

  onModuleInit() {
    this.telegrafService.init(this.moduleRef)
    this.telegrafService.startPolling()
  }
}
```

```typescript
/* telegraf-config.service.ts */

import { Injectable } from '@nestjs/common'
import { TelegrafOptionsFactory, TelegrafModuleOptions } from 'nestjs-telegraf'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TelegrafConfigService implements TelegrafOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: this.configService.get('bot.token'),
    }
  }
}
```

```typescript
/* bot.config.ts */

import { registerAs } from '@nestjs/config'

interface Config {
  token: string
}

export default registerAs(
  'bot',
  (): Config => ({
    token: process.env.TELEGRAM_BOT_TOKEN,
  })
)
```

### Telegraf

#### Telegraf methods usage
You can decorate any `Telegraf` method with `@TelegramActionHandler` decorator.

```typescript
/* bot.service.ts */

import { Injectable } from '@nestjs/common'
import { TelegrafTelegramService } from 'nestjs-telegraf'
import { ContextMessageUpdate } from 'telegraf'

@Injectable()
export class BotService {
  /* This decorator handle /start command */
  @TelegramActionHandler({ onStart: true })
  async onStart(ctx: ContextMessageUpdate) {
    await ctx.reply('/start command reply')
  }
}
```

##### Today available actions for decorator:

- [`onStart`](https://telegraf.js.org/#/?id=start) Handler for /start command.

- [`command`](https://telegraf.js.org/#/?id=command) Command handling.

- [`message`](https://telegraf.js.org/#/?id=hears) Registers middleware for handling text messages.

- [`action`](https://telegraf.js.org/#/?id=action) Registers middleware for handling `callback_data` actions with regular expressions.

#### Telegraf middlewares usage

See https://github.com/bukhalo/nestjs-telegraf/issues/7#issuecomment-577582322

#### Telegraf proxy usage

```typescript

/* bot.config.ts */

import { registerAs } from '@nestjs/config'

interface Config {
  token: string
  socksHost: string
  socksPort: string | number
  socksUser: string
  socksPassword: string
}

export default registerAs(
  'bot',
  (): Config => ({
    token: process.env.TELEGRAM_BOT_TOKEN,
    socksHost: process.env.TELEGRAM_BOT_SOCKS_HOST,
    socksPort: process.env.TELEGRAM_BOT_SOCKS_PORT,
    socksUser: process.env.TELEGRAM_BOT_SOCKS_USER,
    socksPassword: process.env.TELEGRAM_BOT_SOCKS_PASS,
  }),
);

```

```typescript

/* telegraf-config.service.ts */

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf'
import { SocksProxyAgent } from 'socks-proxy-agent'

@Injectable()
export class TelegrafConfigService implements TelegrafOptionsFactory {
  private agent

  constructor(private readonly configService: ConfigService) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    const proxyConfig = {
      host: this.configService.get('bot.socksHost'),
      port: this.configService.get('bot.socksPort'),
      userId: this.configService.get('bot.socksUser'),
      password: this.configService.get('bot.socksPassword'),
    }
    this.agent = new SocksProxyAgent(proxyConfig)

    return {
      token: this.configService.get('bot.token'),
      telegrafOptions: { telegram: { agent: this.agent } },
    };
  }
}

```

### Telegram

#### Telegram methods usage

Inject `TelegrafTelegramService` from `nestjs-telegraf` package for use [Telegram instance](https://telegraf.js.org/#/?id=telegram) from `telegraf` package.

```typescript
/* bot.service.ts */

import { Injectable } from '@nestjs/common'
import { TelegrafTelegramService, TelegramActionHandler } from 'nestjs-telegraf'
import { ContextMessageUpdate } from 'telegraf'

@Injectable()
export class BotService {
  constructor(
    private readonly telegrafTelegramService: TelegrafTelegramService
  ) {}

  @TelegramActionHandler({ onStart: true })
  async start(ctx: ContextMessageUpdate) {
    const me = await this.telegrafTelegramService.getMe()
    console.log(me)
  }
}
```

## Examples

You can see the basic use of the package in this repository:
https://github.com/bukhalo/nestjs-telegraf-sample

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## People

- Authors - [Aleksandr Bukhalo](https://bukhalo.com/) & [Igor Kamyshev](https://kamyshev.me/)
- Maintainers - [Aleksandr Bukhalo](https://bukhalo.com/)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
