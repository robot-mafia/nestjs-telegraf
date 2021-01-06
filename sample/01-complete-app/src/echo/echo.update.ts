import { Telegraf } from 'telegraf';
import {
  Ctx,
  MessageText,
  Help,
  InjectBot,
  On,
  Start,
  Update,
  Hears,
} from 'nestjs-telegraf';
import { EchoService } from './echo.service';
import { GreeterBotName } from '../app.constants';
import { Context } from '../interfaces/context.interface';
import { ReverseTextPipe } from '../common/pipes/reverse-text.pipe';

@Update()
export class EchoUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly echoService: EchoService,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @On('text')
  onMessage(@MessageText(new ReverseTextPipe()) messageText: string): string {
    return this.echoService.echo(messageText);
  }
}
