import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';

@Catch()
export class TelegrafExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const tgHost = TelegrafArgumentsHost.create(host);
    console.log(tgHost);
    return exception;
  }
}
