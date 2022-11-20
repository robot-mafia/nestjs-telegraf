import { ContextType, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { TgArgumentsHost } from './tg-arguments-host.interface';

export type TelegrafContextType = 'telegraf' | ContextType;

export class TelegrafExecutionContext
  extends ExecutionContextHost
  implements TgArgumentsHost
{
  static create(context: ExecutionContext): TelegrafExecutionContext {
    const type = context.getType();
    const tgContext = new TelegrafExecutionContext(
      context.getArgs(),
      context.getClass(),
      context.getHandler(),
    );
    tgContext.setType(type);
    return tgContext;
  }

  getType<TContext extends string = TelegrafContextType>(): TContext {
    return super.getType();
  }

  getContext<T = any>(): T {
    return this.getArgByIndex(0);
  }

  getNext<T = any>(): T {
    return this.getArgByIndex(1);
  }
}
