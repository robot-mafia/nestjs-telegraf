# NestJS Telegraf ![npm](https://img.shields.io/npm/dm/nestjs-telegraf) ![GitHub last commit](https://img.shields.io/github/last-commit/bukhalo/nestjs-telegraf) ![NPM](https://img.shields.io/npm/l/nestjs-telegraf)

<img align="right" width="95" height="148" title="NestJS logotype"
     src="https://nestjs.com/img/logo-small.svg">

NestJS Telegraf – powerful solution for creating Telegram bots.

This package uses the best of the NodeJS world under the hood. [Telegraf](https://github.com/telegraf/telegraf) is the most powerful library for creating bots and [NestJS](https://github.com/nestjs) is a progressive framework for creating well-architectured applications. This module provides fast and easy way for creating Telegram bots and deep integration with your NestJS application. 

**Features**

- Simple. Easy to use.
- Ton of decorators available out of the box for handling bot actions.
- Ability to create custom decorators.
- Scenes support.
- Telegraf plugins and custom plugins support.
- Ability to run multiple bots simultaneously.
- Full support of NestJS guards, interceptors, filters and pipes! (*in progress...*)

## Documentation
If you want to dive fully into NestJS Telegraf then don't waste your time in this dump, check out the [documentation site](https://nestjs-telegraf.vercel.app).

## Installation

```bash
$ npm i nestjs-telegraf
```

## Usage
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

Then create `app.update.ts` file and add some decorators for handling Telegram bot API updates:

```typescript
import {
  Update,
  Start,
  Help,
  On,
  Hears,
  Context,
} from 'nestjs-telegraf';
import { AppService } from './app.service';
import { Context } from './context.interface';

@Update()
export class AppUpdate {
  constructor(private readonly appService: AppService)

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }
}
```
