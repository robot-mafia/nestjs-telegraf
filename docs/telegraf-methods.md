# Telegraf methods
Each Telegraf instance method has own decorator in `nestjs-telegraf` package. The name of the decorator corresponds to the name of the Telegraf method. For example [`@Hears`](https://telegraf.js.org/classes/telegraf.html#hears), [`@On`](https://telegraf.js.org/classes/telegraf.html#on), [`@Action`](https://telegraf.js.org/classes/telegraf.html#action) and so on.

Now let's try simple example:

```typescript title="src/app.update.ts"
import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
} from 'nestjs-telegraf';
import { TelegrafContext } from './common/interfaces/telegraf-context.interface.ts';

@Update()
export class AppUpdate {
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hey there');
  }
}
```
