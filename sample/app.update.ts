import { Telegraf } from 'telegraf';
import { Help, InjectBot, On, Start, Update } from '../lib/decorators';
import { Context } from '../lib/interfaces';
import { EchoService } from './echo.service';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly echoService: EchoService,
  ) {}

  @Start()
  async onStart(ctx: Context): Promise<void> {
    const me = await this.bot.telegram.getMe();
    await ctx.reply(`Hey, I'm ${me.first_name}`);
  }

  @Help()
  async onHelp(ctx: Context): Promise<void> {
    await ctx.reply('Send me any text');
  }

  @On('message')
  async onMessage(ctx: Context): Promise<void> {
    console.log('New message received');

    if ('text' in ctx.message) {
      const messageText = ctx.message.text;
      const echoText = this.echoService.echo(messageText);
      await ctx.reply(echoText);
    } else {
      await ctx.reply('Only text messages');
    }
  }
}
