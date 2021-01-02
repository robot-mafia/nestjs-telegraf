---
id: bot-injection
title: Bot injection
sidebar_label: Bot injection
slug: /bot-injection
---

At times you may need to access the native `Telegraf` instance. For example, you may want to connect stage middleware. You can inject the Telegraf by using the `@InjectBot()` decorator as follows:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectBot, TelegrafProvider, Context } from 'nestjs-telegraf';

@Injectable()
export class BotSettingsService {
  constructor(@InjectBot() private bot: TelegrafProvider<Context>) {}
}
```
