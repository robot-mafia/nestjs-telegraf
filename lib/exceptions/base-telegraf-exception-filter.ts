import { ArgumentsHost, Logger } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { Context } from 'telegraf';
import { TelegrafExceptionFilter } from '../interfaces/telegraf-exception-filter.interface';
import { TelegrafException } from '../errors';
import { isErrorObject } from '../helpers/is-error-object.helper';
import { TelegrafArgumentsHost } from '../execution-context';

export class BaseTelegrafExceptionFilter<TError = any>
  implements TelegrafExceptionFilter {
  private static readonly logger = new Logger('TelegrafExceptionsHandler');

  catch(exception: TError, host: ArgumentsHost): void {
    const context = TelegrafArgumentsHost.create(host).getContext<Context>();
    this.handleError(exception, context);
  }

  public handleError(exception: TError, context: Context): void {
    if (!(exception instanceof TelegrafException)) {
      return this.handleUnknownError(exception, context);
    }

    context.reply(exception.message);
  }

  public handleUnknownError(exception: TError, context: Context): void {
    context.reply(MESSAGES.UNKNOWN_EXCEPTION_MESSAGE);

    const errorMessage = isErrorObject(exception)
      ? exception.message
      : exception;
    BaseTelegrafExceptionFilter.logger.error(errorMessage);
  }
}
