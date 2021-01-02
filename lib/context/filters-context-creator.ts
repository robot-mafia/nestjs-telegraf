import { NestContainer } from '@nestjs/core';
import { BaseExceptionFilterContext } from '@nestjs/core/exceptions/base-exception-filter-context';
import { EXCEPTION_FILTERS_METADATA } from '@nestjs/common/constants';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { TelegrafExceptionsHandler } from '../exceptions/telegraf-exceptions-handler';

export class FiltersContextCreator extends BaseExceptionFilterContext {
  constructor(container: NestContainer) {
    super(container);
  }

  public create(
    instance: object,
    callback: (...args: any[]) => void,
    moduleKey: string,
  ): TelegrafExceptionsHandler {
    this.moduleContext = moduleKey;

    const exceptionHandler = new TelegrafExceptionsHandler();
    const filters = this.createContext(
      instance,
      callback,
      EXCEPTION_FILTERS_METADATA,
    );

    if (isEmpty(filters)) {
      return exceptionHandler;
    }

    exceptionHandler.setCustomFilters(filters.reverse());

    return exceptionHandler;
  }

  public getGlobalMetadata<T extends any[]>(): T {
    return [] as T;
  }
}
