import { ArgumentsHost } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { TgArgumentsHost } from './tg-arguments-host.interface';

export class TelegrafArgumentsHost
  extends ExecutionContextHost
  implements TgArgumentsHost
{
  static create(context: ArgumentsHost): TelegrafArgumentsHost {
    const type = context.getType();
    const tgContext = new TelegrafArgumentsHost(context.getArgs());
    tgContext.setType(type);
    return tgContext;
  }

  getContext<T = any>(): T {
    return this.getArgByIndex(0);
  }

  getNext<T = any>(): T {
    return this.getArgByIndex(1);
  }
}
