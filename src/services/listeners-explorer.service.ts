import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Module } from '@nestjs/core/injector/module';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { Composer, Context, Bot } from 'grammy';

import { MetadataAccessorService } from './metadata-accessor.service';
import {
  PARAM_ARGS_METADATA,
  TELEGRAF_BOT_NAME,
  TELEGRAF_MODULE_OPTIONS,
  TELEGRAF_STAGE,
} from '../telegraf.constants';
import { BaseExplorerService } from './base-explorer.service';
import { TelegrafParamsFactory } from '../factories/telegraf-params-factory';
import { TelegrafContextType } from '../execution-context';
import { ListenerMetadata, TelegrafModuleOptions } from '../interfaces';

@Injectable()
export class ListenersExplorerService
  extends BaseExplorerService
  implements OnModuleInit
{
  private readonly telegrafParamsFactory = new TelegrafParamsFactory();
  private bot: Bot;

  constructor(
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly telegrafOptions: TelegrafModuleOptions,
    @Inject(TELEGRAF_BOT_NAME)
    private readonly botName: string,
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
    private readonly externalContextCreator: ExternalContextCreator,
  ) {
    super();
  }

  onModuleInit(): void {
    this.bot = this.moduleRef.get<Bot>(this.botName, {
      strict: false,
    });

    this.explore();
  }

  explore(): void {
    const modules = this.getModules(
      this.modulesContainer,
      this.telegrafOptions.include || [],
    );

    this.registerUpdates(modules);
  }

  private registerUpdates(modules: Module[]): void {
    const updates = this.flatMap<InstanceWrapper>(modules, (instance) =>
      this.filterUpdates(instance),
    );
    updates.forEach((wrapper) => this.registerListeners(this.bot, wrapper));
  }

  private filterUpdates(wrapper: InstanceWrapper): InstanceWrapper<unknown> {
    const { instance } = wrapper;
    if (!instance) return undefined;

    const isUpdate = this.metadataAccessor.isUpdate(wrapper.metatype);
    if (!isUpdate) return undefined;

    return wrapper;
  }

  private registerListeners(
    composer: Composer<any>,
    wrapper: InstanceWrapper<unknown>,
  ): void {
    const { instance } = wrapper;
    const prototype = Object.getPrototypeOf(instance);
    this.metadataScanner.scanFromPrototype(instance, prototype, (name) =>
      this.registerIfListener(composer, instance, prototype, name),
    );
  }

  private registerIfListener(
    composer: Composer<any>,
    instance: any,
    prototype: any,
    methodName: string,
    defaultMetadata?: ListenerMetadata[],
  ): void {
    const methodRef = prototype[methodName];
    const metadata =
      this.metadataAccessor.getListenerMetadata(methodRef) || defaultMetadata;
    if (!metadata || metadata.length < 1) {
      return undefined;
    }

    const listenerCallbackFn = this.createContextCallback(
      instance,
      prototype,
      methodName,
    );

    for (const { method, args } of metadata) {
      /* Basic callback */
      // composer[method](...args, listenerCallbackFn);

      /* Complex callback return value handing */
      composer[method](
        ...args,
        async (ctx: Context, next: Function): Promise<void> => {
          const result = await listenerCallbackFn(ctx, next);
          if (result) {
            await ctx.reply(String(result));
          }
          // TODO-Possible-Feature: Add more supported return types
        },
      );
    }
  }

  createContextCallback<T extends Record<string, unknown>>(
    instance: T,
    prototype: unknown,
    methodName: string,
  ) {
    const paramsFactory = this.telegrafParamsFactory;
    return this.externalContextCreator.create<
      Record<number, ParamMetadata>,
      TelegrafContextType
    >(
      instance,
      prototype[methodName],
      methodName,
      PARAM_ARGS_METADATA,
      paramsFactory,
      undefined,
      undefined,
      undefined,
      'telegraf',
    );
  }
}
