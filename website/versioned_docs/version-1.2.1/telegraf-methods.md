---
id: telegraf-methods
title: Telegraf methods
sidebar_label: Telegraf methods
slug: /telegraf-methods
---

Each Telegraf instance method described [here](https://telegraf.js.org/#/?id=telegraf) has own decorator in `nestjs-telegraf` package. The name of the decorator corresponds to the name of the Telegraf method. For example [`@TelegrafHears`](https://telegraf.js.org/#/?id=hears), [`@TelegrafOn`](https://telegraf.js.org/#/?id=on), [`@TelegrafAction`](https://telegraf.js.org/#/?id=action) and so on.

Now let's try to repeat the example from the Telegraf [documentation page](https://telegraf.js.org/#/?id=example).

```typescript
/* app.service.ts */

import { Injectable } from '@nestjs/common';
import {
  TelegrafStart,
  TelegrafHelp,
  TelegrafOn,
  TelegrafHears,
  Context,
} from 'nestjs-telegraf';

@Injectable()
export class AppService {
  @TelegrafStart()
  start(ctx: Context) {
    ctx.reply('Welcome');
  }

  @TelegrafHelp()
  help(ctx: Context) {
    ctx.reply('Send me a sticker');
  }

  @TelegrafOn('sticker')
  on(ctx: Context) {
    ctx.reply('👍');
  }

  @TelegrafHears('hi')
  hears(ctx: Context) {
    ctx.reply('Hey there');
  }
}
```
