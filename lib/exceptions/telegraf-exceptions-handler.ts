import { ArgumentsHost } from '@nestjs/common';
import { ExceptionFilterMetadata } from '@nestjs/common/interfaces/exceptions';
import { BaseTelegrafExceptionFilter } from './base-telegraf-exception-filter';
import { TelegrafException } from '../errors';
import { InvalidExceptionFilterException } from '@nestjs/core/errors/exceptions/invalid-exception-filter.exception';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

export class TelegrafExceptionsHandler extends BaseTelegrafExceptionFilter {
  private filters: ExceptionFilterMetadata[] = [];

  public handle(
    exception: Error | TelegrafException | any,
    host: ArgumentsHost,
  ): void {
    const isFilterInvoked = this.invokeCustomFilters(exception, host);
    if (!isFilterInvoked) {
      super.catch(exception, host);
    }
  }

  public invokeCustomFilters<T = any>(
    exception: T,
    args: ArgumentsHost,
  ): boolean {
    if (isEmpty(this.filters)) return false;

    const filter = this.filters.find(({ exceptionMetatypes }) => {
      const hasMetatype =
        !exceptionMetatypes.length ||
        exceptionMetatypes.some(
          (ExceptionMetatype) => exception instanceof ExceptionMetatype,
        );
      return hasMetatype;
    });

    filter && filter.func(exception, args);

    return !!filter;
  }

  public setCustomFilters(filters: ExceptionFilterMetadata[]): void {
    if (!Array.isArray(filters)) {
      throw new InvalidExceptionFilterException();
    }

    this.filters = filters;
  }
}
