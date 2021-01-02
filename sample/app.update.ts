import { Telegraf } from 'telegraf';
import { SceneContextMessageUpdate } from 'telegraf/typings/stage';
import {
  Command,
  Ctx,
  Help,
  InjectBot,
  MessageText,
  On,
  Start,
  Update,
} from '../lib';
import { EchoService } from './echo.service';
import { HELLO_SCENE_ID } from './app.constants';
import { Context } from './interfaces/context.interface';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminGuard } from './common/guards/admin.guard';
import { ResponseTimeInterceptor } from './common/interceptors/response-time.interceptor';
import { ReverseTextPipe } from './common/pipes/reverse-text.pipe';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<SceneContextMessageUpdate>,
    private readonly echoService: EchoService,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  @UseInterceptors(ResponseTimeInterceptor)
  async onHelp(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Send me any text');
  }

  @UseGuards(AdminGuard)
  @Command('admin')
  async onAdminCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Welcome judge');
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }

  @On('message')
  async onMessage(
    @Ctx() ctx: Context,
    @MessageText(new ReverseTextPipe()) reversedMessage: string,
  ): Promise<void> {
    console.log('New message received');

    if ('text' in ctx.message) {
      const echoText = this.echoService.echo(reversedMessage);
      await ctx.reply(echoText);
    } else {
      await ctx.reply('Only text messages');
    }
  }
}
