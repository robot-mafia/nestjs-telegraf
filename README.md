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

## Documentation
If you want to dive fully into NestJS Telegraf then don't waste your time in this dump, check out the [documentation site](https://nestjs-telegraf.vercel.app).

## Installation

```bash
$ npm i nestjs-telegraf
```

Once the installation process is complete, we can import the `TelegrafModule` into the root `AppModule`:

```typescript
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

Then add some decorators into the `app.service.ts` for handling Telegram bot API updates:

```typescript
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
