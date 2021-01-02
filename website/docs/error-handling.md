---
id: error-handling
title: Error handling
sidebar_label: Error handling
slug: /error-handling
---

By default, `nestjs-telegraf` catches all errors using the `Logger` built into NestJS.

Use can disable global errors catch with `disableGlobalCatch`:
```typescript
TelegrafModule.forRoot({
  disableGlobalCatch: true,  
}),
```

After that you can override errors handling with bot instance `catch` function.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectBot, TelegrafProvider, Context } from 'nestjs-telegraf';

@Injectable()
export class BotSettingsService {
  constructor(@InjectBot() private bot: TelegrafProvider<Context>) {
    this.bot.catch((err, ctx) => {
      console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
    });
  }
}
```
