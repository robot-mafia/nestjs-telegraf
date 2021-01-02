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

`@Update` class decorator, it's like NestJS [`@Controller`](https://docs.nestjs.com/controllers) decorator, but for [Telegram Bot API updates](https://core.telegram.org/bots/api#getting-updates).
It is required for the class that will receive updates from Telegram.

```typescript {3}
import { Update, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  ...
}
```

### Message

Use `@Message` method decorator for handling new incoming message of any kind — text, photo, sticker, etc.

```typescript {5}
import { Update, Message, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @Message()
  message(ctx: Context) {
    ctx.reply(`You say: ${ctx.message.text}`);
  }
}
```

### EditedMessage

Use `@EditedMessage` method decorator for handling new version of a message that is known to the bot and was edited.

```typescript {5}
import { Update, EditedMessage, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @EditedMessage()
  editedMessage(ctx: Context) {
    ...
  }
}
```

### ChannelPost

Use `@ChannelPost` method decorator for handling new incoming channel post of any kind — text, photo, sticker, etc.

```typescript {5}
import { Update, ChannelPost, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @ChannelPost()
  channelPost(ctx: Context) {
    ...
  }
}
```

### EditedChannelPost

Use `@EditedChannelPost` method decorator for handling new version of a channel post that is known to the bot and was edited.

```typescript {5}
import { Update, EditedChannelPost, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @EditedChannelPost()
  editedChannelPost(ctx: Context) {
    ...
  }
}
```

### InlineQuery

Use `@InlineQuery` method decorator for handling new incoming inline query.

```typescript {5}
import { Update, InlineQuery, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @InlineQuery()
  inlineQuery(ctx: Context) {
    ...
  }
}
```

The `@InlineQuery` decorator can take a `triggers` option to handle inline query with specific value.

```typescript {6}
import { Update, InlineQuery, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @InlineQuery({
    triggers: 'trigger' // string/string[]/RegEx/RegEx[]
  })
  inlineQuery(ctx: Context) {
    ...
  }
}
```



### ChosenInlineResult

Use `@ChosenInlineResult` method decorator for handling result of an inline query that was chosen by a user and sent to their chat partner.

```typescript {5}
import { Update, ChosenInlineResult, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @ChosenInlineResult()
  chosenInlineResult(ctx: Context) {
    ...
  }
}
```

### CallbackQuery

Use `@CallbackQuery` method decorator for handling new incoming callback query.

```typescript {5}
import { Update, CallbackQuery, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @CallbackQuery()
  callbackQuery(ctx: Context) {
    ...
  }
}
```

### ShippingQuery

Use `@ShippingQuery` method decorator for handling new incoming shipping query. Only for invoices with flexible price.

```typescript {5}
import { Update, ShippingQuery, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @ShippingQuery()
  shippingQuery(ctx: Context) {
    ...
  }
}
```

### PreCheckoutQuery

Use `@PreCheckoutQuery` method decorator for handling new incoming pre-checkout query. Contains full information about checkout.

```typescript {5}
import { Update, PreCheckoutQuery, Context } from 'nestjs-telegraf';

@Update()
export class SomeBotService {
  @PreCheckoutQuery()
  preCheckoutQuery(ctx: Context) {
    ...
  }
}
```
