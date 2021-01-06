import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Module } from '@nestjs/core/injector/module';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';
import { BaseScene, Composer, Stage, Telegraf } from 'telegraf';

import { MetadataAccessorService } from './metadata-accessor.service';
import {
  PARAM_ARGS_METADATA,
  TELEGRAF_BOT_NAME,
  TELEGRAF_MODULE_OPTIONS,
} from '../telegraf.constants';
import { BaseExplorerService } from './base-explorer.service';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { TelegrafParamsFactory } from '../factories/telegraf-params-factory';
import { TelegrafContextType } from '../execution-context/telegraf-execution-context';
import { TelegrafModuleOptions } from '../interfaces';

@Injectable()
export class ListenersExplorerService
  extends BaseExplorerService
  implements OnModuleInit {
  private readonly telegrafParamsFactory = new TelegrafParamsFactory();
  private readonly stage = new Stage([]);
  private bot: Telegraf<any>;

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
    this.bot = this.moduleRef.get<Telegraf<never>>(this.botName, {
      strict: false,
    });
    this.bot.use(this.stage.middleware());

    this.explore();
  }

  explore(): void {
    const modules = this.getModules(
      this.modulesContainer,
      this.telegrafOptions.include || [],
    );

    this.registerUpdates(modules);
    this.registerScenes(modules);
  }

  private registerUpdates(modules: Module[]): void {
    const updates = this.flatMap<InstanceWrapper>(modules, (instance) =>
      this.filterUpdates(instance),
    );
    updates.forEach((wrapper) => this.registerListeners(this.bot, wrapper));
  }

  private registerScenes(modules: Module[]): void {
    const scenes = this.flatMap<InstanceWrapper>(modules, (wrapper) =>
      this.filterScenes(wrapper),
    );
    scenes.forEach((wrapper) => {
      const sceneId = this.metadataAccessor.getSceneMetadata(
        wrapper.instance.constructor,
      );
      const scene = new BaseScene(sceneId);
      this.stage.register(scene);

      this.registerListeners(scene, wrapper);
    });
  }

  private filterUpdates(wrapper: InstanceWrapper): InstanceWrapper<unknown> {
    const { instance } = wrapper;
    if (!instance) return undefined;

    const isUpdate = this.metadataAccessor.isUpdate(wrapper.metatype);
    if (!isUpdate) return undefined;

    return wrapper;
  }

  private filterScenes(wrapper: InstanceWrapper): InstanceWrapper<unknown> {
    const { instance } = wrapper;
    if (!instance) return undefined;

    const isScene = this.metadataAccessor.isScene(wrapper.metatype);
    if (!isScene) return undefined;

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
  ): void {
    const methodRef = prototype[methodName];
    const metadata = this.metadataAccessor.getListenerMetadata(methodRef);
    if (!metadata) {
      return undefined;
    }

    const listenerCallbackFn = this.createContextCallback(
      instance,
      prototype,
      methodName,
    );

    // TODO: Add callback to middleware and handle return data
  }

  createContextCallback<T extends Record<string, unknown>>(
    instance: T,
    prototype: unknown,
    methodName: string,
  ) {
    const paramsFactory = this.telegrafParamsFactory;
    const resolverCallback = this.externalContextCreator.create<
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
    return resolverCallback;
  }
}
