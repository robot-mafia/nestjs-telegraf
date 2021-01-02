import { ArgumentsHost } from '@nestjs/common';

export interface TelegrafExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentsHost): any;
}
