import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Module } from '@nestjs/core/injector/module';
import { BaseScene, Composer, Stage, Telegraf } from 'telegraf';

import { MetadataAccessorService } from './metadata-accessor.service';
import {
  PARAM_ARGS_METADATA,
  TELEGRAF_MODULE_OPTIONS,
} from '../telegraf.constants';
import { ListenerMetadata, TelegrafModuleOptions } from '../interfaces';
import { BaseExplorerService } from './base-explorer.service';
import { getBotToken } from '../utils';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { TelegrafParamsFactory } from '../factories/telegraf-params-factory';
import { TelegrafContextType } from '../execution-context/telegraf-execution-context';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';

interface ListenerCallbackMetadata {
  methodName: string;
  metadata: ListenerMetadata;
}

@Injectable()
export class ListenersExplorerService
  extends BaseExplorerService
  implements OnModuleInit {
  private readonly telegrafParamsFactory = new TelegrafParamsFactory();
  private readonly stage = new Stage([]);
  private bot: Telegraf<never>;

  constructor(
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly telegrafOptions: TelegrafModuleOptions,
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
    const botToken = getBotToken(this.telegrafOptions.name);
    this.bot = this.moduleRef.get<Telegraf<never>>(botToken);
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
    updates.forEach(({ instance }) =>
      this.registerInstanceMethodListeners(this.bot, instance),
    );
  }

  private registerScenes(modules: Module[]): void {
    const scenes = this.flatMap<InstanceWrapper>(
      modules,
      (instance, moduleRef) => this.filterScenes(instance),
    );
    scenes.forEach((wrapper) => {
      const sceneId = this.metadataAccessor.getSceneMetadata(
        instance.constructor,
      );
      const scene = new BaseScene(sceneId);
      this.stage.register(scene);

      this.registerInstanceMethodListeners(scene, wrapper);
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

  private registerInstanceMethodListeners(
    composer: Composer<never>,
    wrapper: InstanceWrapper<unknown>,
  ): void {
    const { instance } = wrapper;
    const prototype = Object.getPrototypeOf(instance);
    const listenersMetadata = this.metadataScanner.scanFromPrototype(
      instance,
      prototype,
      (name): ListenerCallbackMetadata =>
        this.extractListenerCallbackMetadata(prototype, name),
    );

    const contextCallbackFn = this.createContextCallback(
      instance,
      prototype,
      wrapper,
    );
  }

  private extractListenerCallbackMetadata(
    prototype: any,
    methodName: string,
  ): ListenerCallbackMetadata {
    const callback = prototype[methodName];
    const metadata = this.metadataAccessor.getListenerMetadata(callback);

    if (!metadata) {
      return undefined;
    }

    return {
      methodName,
      metadata: metadata,
    };
  }

  createContextCallback<T extends Record<string, unknown>>(
    instance: T,
    prototype: unknown,
    wrapper: InstanceWrapper,
    moduleRef: Module,
    listener: ListenerMetadata,
  ) {
    const paramsFactory = this.telegrafParamsFactory;
    const resolverCallback = this.externalContextCreator.create<
      Record<number, ParamMetadata>,
      TelegrafContextType
    >(
      instance,
      prototype[listener.methodName],
      listener.methodName,
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
