import { Controller, PipeTransform } from '@nestjs/common/interfaces';
import { PipesContextCreator } from '@nestjs/core/pipes/pipes-context-creator';
import { PipesConsumer } from '@nestjs/core/pipes/pipes-consumer';
import { GuardsContextCreator } from '@nestjs/core/guards/guards-context-creator';
import { GuardsConsumer } from '@nestjs/core/guards/guards-consumer';
import { InterceptorsContextCreator } from '@nestjs/core/interceptors/interceptors-context-creator';
import { InterceptorsConsumer } from '@nestjs/core/interceptors/interceptors-consumer';
import {
  ContextUtils,
  ParamProperties,
} from '@nestjs/core/helpers/context-utils';
import { HandlerMetadataStorage } from '@nestjs/core/helpers/handler-metadata-storage';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards/constants';
import { ParamsMetadata } from '@nestjs/core/helpers/interfaces';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

import { FiltersContextCreator } from './filters-context-creator';
import { TelegrafContextType } from '../execution-context/telegraf-execution-context';
import { TelegrafProxy } from './telegraf-proxy';
import { TelegrafException } from '../errors';
import {
  CUSTOM_LISTENER_AGRS_METADATA,
  LISTENER_ARGS_METADATA,
} from '../telegraf.constants';
import { TelegrafParamsFactory } from '../factories/telegraf-params-factory';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

export type Update = Controller;
type TelegrafParamProperties = ParamProperties & { metatype?: any };

export interface TelegrafHandlerMetadata {
  argsLength: number;
  paramtypes: any[];
  getParamsMetadata: (moduleKey: string) => TelegrafParamProperties[];
}

export class TelegrafContextCreator {
  private readonly contextUtils = new ContextUtils();
  private readonly telegrafParamsFactory = new TelegrafParamsFactory();
  private readonly handlerMetadataStorage = new HandlerMetadataStorage<TelegrafHandlerMetadata>();

  constructor(
    private readonly telegrafProxy: TelegrafProxy,
    private readonly exceptionFiltersContext: FiltersContextCreator,
    private readonly pipesContextCreator: PipesContextCreator,
    private readonly pipesConsumer: PipesConsumer,
    private readonly guardsContextCreator: GuardsContextCreator,
    private readonly guardsConsumer: GuardsConsumer,
    private readonly interceptorsContextCreator: InterceptorsContextCreator,
    private readonly interceptorsConsumer: InterceptorsConsumer,
  ) {}

  public create<T extends ParamsMetadata = ParamsMetadata>(
    instance: Update,
    methodRef: (...args: unknown[]) => void,
    moduleName: string,
    methodKey: string,
  ): (...args: any[]) => Promise<void> {
    const contextType: TelegrafContextType = 'telegraf';
    const { argsLength, paramtypes, getParamsMetadata } = this.getMetadata<T>(
      instance,
      methodKey,
      contextType,
    );

    const exceptionHandler = this.exceptionFiltersContext.create(
      instance,
      methodRef,
      moduleName,
    );

    const pipes = this.pipesContextCreator.create(
      instance,
      methodRef,
      moduleName,
    );

    const guards = this.guardsContextCreator.create(
      instance,
      methodRef,
      moduleName,
    );

    const interceptors = this.interceptorsContextCreator.create(
      instance,
      methodRef,
      moduleName,
    );

    const paramsMetadata = getParamsMetadata(moduleName);
    const paramsOptions = paramsMetadata
      ? this.contextUtils.mergeParamsMetatypes(paramsMetadata, paramtypes)
      : [];
    const fnApplyPipes = this.createPipesFn(pipes, paramsOptions);

    const fnCanActivate = this.createGuardsFn(
      guards,
      instance,
      methodRef,
      contextType,
    );

    const handler = <TContext>(
      initialArgs: unknown[],
      ctx: TContext,
      next: Function,
    ) => async () => {
      if (fnApplyPipes) {
        await fnApplyPipes(initialArgs, ctx, next);
        return methodRef.apply(instance, initialArgs);
      }
      return methodRef.apply(instance, [ctx, next]);
    };

    const targetCallback = async <TContext>(ctx: TContext, next: Function) => {
      const initialArgs = this.contextUtils.createNullArray(argsLength);
      fnCanActivate && (await fnCanActivate([ctx, next]));

      return this.interceptorsConsumer.intercept(
        interceptors,
        [ctx, next],
        instance,
        methodRef,
        handler(initialArgs, ctx, next),
        contextType,
      );
    };

    return this.telegrafProxy.create(targetCallback, exceptionHandler);
  }

  public getMetadata<
    TMetadata,
    TContext extends TelegrafContextType = TelegrafContextType
  >(
    instance: Controller,
    methodName: string,
    contextType: TContext,
  ): TelegrafHandlerMetadata {
    const cachedMetadata = this.handlerMetadataStorage.get(
      instance,
      methodName,
    );
    if (cachedMetadata) return cachedMetadata;

    const metadata =
      this.contextUtils.reflectCallbackMetadata<TMetadata>(
        instance,
        methodName,
        LISTENER_ARGS_METADATA,
      ) || {};

    const keys = Object.keys(metadata);
    const argsLength = this.contextUtils.getArgumentsLength(keys, metadata);
    const contextFactory = this.contextUtils.getContextFactory(
      contextType,
      instance,
      instance[methodName],
    );
    const getParamsMetadata = (moduleKey: string) =>
      this.exchangeKeysForValues(
        keys,
        metadata,
        moduleKey,
        this.telegrafParamsFactory,
        contextFactory,
      );

    const paramtypes = this.contextUtils.reflectCallbackParamtypes(
      instance,
      methodName,
    );
    const handlerMetadata: TelegrafHandlerMetadata = {
      argsLength,
      paramtypes,
      getParamsMetadata,
    };
    this.handlerMetadataStorage.set(instance, methodName, handlerMetadata);
    return handlerMetadata;
  }

  public exchangeKeysForValues<TMetadata = any>(
    keys: string[],
    metadata: TMetadata,
    moduleContext: string,
    paramsFactory: TelegrafParamsFactory,
    contextFactory: (args: unknown[]) => ExecutionContextHost,
  ): ParamProperties[] {
    this.pipesContextCreator.setModuleContext(moduleContext);

    return keys.map((key) => {
      const { index, data, pipes: pipesCollection } = metadata[key];
      const pipes = this.pipesContextCreator.createConcreteContext(
        pipesCollection,
      );
      const type = this.contextUtils.mapParamType(key);

      if (key.includes(CUSTOM_LISTENER_AGRS_METADATA)) {
        const { factory } = metadata[key];
        const customExtractValue = this.contextUtils.getCustomFactory(
          factory,
          data,
          contextFactory,
        );
        return { index, extractValue: customExtractValue, type, data, pipes };
      }
      const numericType = Number(type);
      const extractValue = <TContext>(ctx: TContext, next: Function) =>
        paramsFactory.exchangeKeyForValue(numericType, ctx, next);

      return { index, extractValue, type: numericType, data, pipes };
    });
  }

  public createGuardsFn<TContext extends string = TelegrafContextType>(
    guards: any[],
    instance: Controller,
    callback: (...args: unknown[]) => any,
    contextType?: TContext,
  ): Function | null {
    const canActivateFn = async (args: any[]) => {
      const canActivate = await this.guardsConsumer.tryActivate<TContext>(
        guards,
        args,
        instance,
        callback,
        contextType,
      );
      if (!canActivate) {
        throw new TelegrafException(FORBIDDEN_MESSAGE);
      }
    };
    return guards.length ? canActivateFn : null;
  }

  public createPipesFn(
    pipes: PipeTransform[],
    paramsOptions: (ParamProperties & { metatype?: unknown })[],
  ) {
    const pipesFn = async <TContext>(
      args: unknown[],
      ctx: TContext,
      next: Function,
    ) => {
      const resolveParamValue = async (
        param: ParamProperties & { metatype?: unknown },
      ) => {
        const {
          index,
          extractValue,
          type,
          data,
          metatype,
          pipes: paramPipes,
        } = param;
        const value = extractValue(ctx, next);

        args[index] = await this.getParamValue(
          value,
          { metatype, type, data },
          pipes.concat(paramPipes),
        );
      };
      await Promise.all(paramsOptions.map(resolveParamValue));
    };
    return paramsOptions.length ? pipesFn : null;
  }

  public async getParamValue<T>(
    value: T,
    { metatype, type, data }: { metatype: any; type: any; data: any },
    pipes: PipeTransform[],
  ): Promise<any> {
    return isEmpty(pipes)
      ? value
      : this.pipesConsumer.apply(value, { metatype, type, data }, pipes);
  }
}
