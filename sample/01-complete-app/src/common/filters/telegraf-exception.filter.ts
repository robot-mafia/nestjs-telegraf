import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host);
    const ctx = telegrafHost.getContext<Context>();

    await ctx.replyWithHTML(`<b>Error</b>: ${exception.message}`);
  }
}
