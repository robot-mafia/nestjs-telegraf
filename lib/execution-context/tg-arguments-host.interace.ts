import { ArgumentsHost } from '@nestjs/common';

export interface TgArgumentsHost extends ArgumentsHost {
  getContext<T = any>(): T;
  getNext<T = any>(): T;
}
