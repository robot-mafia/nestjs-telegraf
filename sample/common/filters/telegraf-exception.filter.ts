import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TelegrafArgumentsHost, TelegrafException } from '../../../lib';

@Catch()
export class TelegrafExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const tgHost = TelegrafArgumentsHost.create(host);
    console.log(tgHost);
    return exception;
  }
}
