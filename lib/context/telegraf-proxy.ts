import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { isObservable } from '../helpers/is-observable.helper';
import { TelegrafExceptionsHandler } from '../exceptions/telegraf-exceptions-handler';

export class TelegrafProxy {
  public create(
    targetCallback: <TContext>(ctx: TContext, next: Function) => Promise<any>,
    exceptionsHandler: TelegrafExceptionsHandler,
  ): <TContext>(ctx: TContext, next: Function) => Promise<any> {
    return async <TContext>(ctx: TContext, next: Function) => {
      try {
        const result = await targetCallback(ctx, next);
        return !isObservable(result)
          ? result
          : result.pipe(
              catchError((error) => {
                this.handleError(exceptionsHandler, [ctx, next], error);
                return EMPTY;
              }),
            );
      } catch (error) {
        this.handleError(exceptionsHandler, [ctx, next], error);
      }
    };
  }

  handleError<T>(
    exceptionsHandler: TelegrafExceptionsHandler,
    args: unknown[],
    error: T,
  ): void {
    const host = new ExecutionContextHost(args);
    host.setType('telegraf');
    exceptionsHandler.handle(error, host);
  }
}
