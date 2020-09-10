---
id: decorators
title: Decorators
sidebar_label: Decorators
slug: /api-reference/decorators
---

:::caution
The described functionality is under development, the functionality has not been tested and can be changed at any time!
:::

### Update

`@Update` class decorator, it's like NestJS [`@Controller`](https://docs.nestjs.com/controllers) decorator, but for [Telegram Bot API updates](https://core.telegram.org/bots/api#getting-updates). Reserved for future use.

```typescript {3}
import { Update, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  ...
}
```
