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
    <td align="center"><a href="https://github.com/bukhalo"><img src="https://avatars2.githubusercontent.com/u/14031838?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Bukhalo</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/commits?author=bukhalo" title="Code">💻</a> <a href="https://github.com/bukhalo/nestjs-telegraf/commits?author=bukhalo" title="Documentation">📖</a> <a href="https://github.com/bukhalo/nestjs-telegraf/pulls?q=is%3Apr+reviewed-by%3Abukhalo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/VyacheslavSaloidWork"><img src="https://avatars3.githubusercontent.com/u/43011265?v=4" width="100px;" alt=""/><br /><sub><b>Vyacheslav Saloid</b></sub></a><br /><a href="https://github.com/bukhalo/nestjs-telegraf/issues?q=author%3AVyacheslavSaloidWork" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
