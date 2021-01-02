import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { BaseScene as Scene, Stage, Telegraf } from 'telegraf';
import { MetadataAccessorService } from './metadata-accessor.service';
import { BaseExplorerService } from './base-explorer.service';
import {
  TELEGRAF_BOT_NAME,
  TELEGRAF_MODULE_OPTIONS,
} from '../telegraf.constants';
import { TelegrafModuleOptions } from '../interfaces';
import { Module } from '@nestjs/core/injector/module';

@Injectable()
export class ScenesExplorerService
  extends BaseExplorerService
  implements OnModuleInit {
  private readonly stage = new Stage([]);

  constructor(
    @Inject(TELEGRAF_BOT_NAME)
    private readonly botName: string,
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly telegrafModuleOptions: TelegrafModuleOptions,
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
  ) {
    super();
  }

  private bot: Telegraf<any>;

  onModuleInit(): void {
    this.bot = this.moduleRef.get<Telegraf<any>>(this.botName, {
      strict: false,
    });
    this.bot.use(this.stage.middleware());
    this.explore();
  }

  private explore(): void {
    const modules = this.getModules(
      this.modulesContainer,
      this.telegrafModuleOptions.include || [],
    );
    const scenes = this.flatMap(modules, (instance, moduleRef) =>
      this.applyScenes(instance, moduleRef),
    );
  }

  private applyScenes(wrapper: InstanceWrapper, moduleRef: Module) {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    const prototype = Object.getPrototypeOf(instance);

    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    const sceneProviders: InstanceWrapper[] = providers.filter(
      (wrapper: InstanceWrapper) =>
        this.metadataAccessor.isScene(wrapper.metatype),
    );

    sceneProviders.forEach((wrapper) => {
      const { instance } = wrapper;
      if (!instance) {
        return undefined;
      }

      const sceneId = this.metadataAccessor.getSceneMetadata(
        instance.constructor,
      );

      const scene = new Scene(sceneId);
      this.stage.register(scene);

      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        (methodKey: string) => {
          const methodRef = instance[methodKey];
          if (this.metadataAccessor.isUpdateListener(methodRef)) {
            const metadata = this.metadataAccessor.getListenerMetadata(
              methodRef,
            );
            const middlewareFn = methodRef.bind(instance);
            const { method, args } = metadata;
            (scene[method] as any)(...args, middlewareFn);
          }
        },
      );
    });
  }
}
