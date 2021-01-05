import { Telegraf } from 'telegraf';
import {
  Command,
  getBotToken,
  Help,
  InjectBot,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { EchoService } from './echo.service';
import { GreeterBotName, HELLO_SCENE_ID } from '../app.constants';
import { Context } from '../interfaces/context.interface';

@Update()
export class EchoUpdate {
  constructor(
    @InjectBot(GreeterBotName)
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
