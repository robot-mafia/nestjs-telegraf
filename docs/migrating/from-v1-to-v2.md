# From v1 to v2
## Remove `Telegraf` prefix
If you previously used decorators with the prefix `Telegraf` in the decorator name (such as `@TelegrafOn()` or `@TelegrafHelp()`) replace them with the same decorators but without the prefix `Telegraf`, such as `@On()`, `@Start()`, `@Command()` and so on.

## `@Update()` decorator
Since v2, `nestjs-telegraf` looks for all update handlers only inside individual classes, under the `@Update()` decorator.

Previously, you could declare a handler anywhere, for example:
```typescript title="src/cats/cats.provider.ts"
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-telegraf';

@Injectable()
export class CatsProvider {
  @Command('cats')
  async helpCommand(ctx: TelegrafContext) {
    await ctx.reply('Meow.');  
  }  
}
```

Now you must explicitly bind the class, for Telegram Bot Api update handlers:
```typescript {3} title="src/cats/cats.updates.ts"
import { Update, Ctx } from 'nestjs-telegraf';

@Update()
export class HelpUpdate {
  @Command('help')
  async helpCommand(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Help command.');  
  }  
}
```

Treat the `@Update()` decorator like the `@Controller()` decorator, but to capture Telegram Bot Api updates.
