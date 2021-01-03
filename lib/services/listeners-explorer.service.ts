import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Module } from '@nestjs/core/injector/module';
import { BaseScene, Composer, Stage, Telegraf } from 'telegraf';

import { MetadataAccessorService } from './metadata-accessor.service';
import { TELEGRAF_MODULE_OPTIONS } from '../telegraf.constants';
import { TelegrafModuleOptions } from '../interfaces';
import { BaseExplorerService } from './base-explorer.service';
import { getBotToken } from '../utils';

@Injectable()
export class TelegrafExplorerService
  extends BaseExplorerService
  implements OnModuleInit {
  private readonly bot: Telegraf<any>;
  private readonly stage = new Stage([]);

  constructor(
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly telegrafOptions: TelegrafModuleOptions,
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
  ) {
    super();

    const botToken = getBotToken(this.telegrafOptions.name);
    this.bot = this.moduleRef.get<Telegraf<never>>(botToken);
    this.bot.use(this.stage.middleware());
  }

  onModuleInit(): void {
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
    const scenes = this.flatMap<InstanceWrapper>(modules, (instance) =>
      this.filterScenes(instance),
    );
    scenes.forEach(({ instance }) => {
      const sceneId = this.metadataAccessor.getSceneMetadata(
        instance.constructor,
      );
      const scene = new BaseScene(sceneId);
      this.stage.register(scene);

      this.registerInstanceMethodListeners(scene, instance);
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
    instance: Record<string, Function>,
  ): void {
    const prototype = Object.getPrototypeOf(instance);
    this.metadataScanner.scanFromPrototype(instance, prototype, (name) => {
      const methodRef = instance[name];

      const metadata = this.metadataAccessor.getListenerMetadata(methodRef);
      if (!metadata) return;

      const middlewareFn = methodRef.bind(instance);
      const { method, args } = metadata;
      composer[method](...args, middlewareFn);
    });
  }
}
