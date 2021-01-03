import { Telegraf } from 'telegraf';
import { Command, Help, InjectBot, On, Start, Update } from '../lib';
import { EchoService } from './echo.service';
import { HELLO_SCENE_ID, SUPPORT_BOT_NAME } from './app.constants';
import { Context } from './interfaces/context.interface';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly defaultBot: Telegraf<Context>,
    @InjectBot(SUPPORT_BOT_NAME)
    private readonly supportBot: Telegraf<Context>,
    private readonly echoService: EchoService,
  ) {}

  @Start()
  async onStart(ctx: Context): Promise<void> {
    const me = await this.defaultBot.telegram.getMe();
    await ctx.reply(`Hey, I'm ${me.first_name}`);
  }

  @Help()
  async onHelp(ctx: Context): Promise<void> {
    await ctx.reply('Send me any text');
  }

  @Command('support')
  async onSupportCommand(ctx: Context): Promise<void> {
    const me = await this.supportBot.telegram.getMe();
    await ctx.reply(`Greetings from ${me.first_name}`);
  }

  @Command('scene')
  async onSceneCommand(ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
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
