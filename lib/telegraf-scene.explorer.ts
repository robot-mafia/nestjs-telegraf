import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { BaseScene as Scene, Stage, Telegraf } from 'telegraf';
import { TelegrafMetadataAccessor } from './telegraf.metadata-accessor';

@Injectable()
export class TelegrafSceneExplorer implements OnModuleInit {
  constructor(
    @Inject(Telegraf)
    private readonly telegraf: Telegraf,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: TelegrafMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit(): void {
    this.explore();
  }

  private explore(): void {
    const sceneClasses = this.filterSceneClasses();
    const stage = new Stage();

    sceneClasses.forEach((wrapper) => {
      const { instance } = wrapper;

      const sceneId = this.metadataAccessor.getSceneMetadata(
        instance.constructor,
      );
      const scene = new Scene(sceneId);
      stage.register(scene);

      const prototype = Object.getPrototypeOf(instance);
      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        (methodKey: string) =>
          this.registerIfListener(scene, instance, methodKey),
      );

      stage.register(scene);
    });

    this.telegraf.use(stage.middleware());
  }

  private filterSceneClasses(): InstanceWrapper[] {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.instance)
      .filter((wrapper) =>
        this.metadataAccessor.isScene(wrapper.instance.constructor),
      );
  }

  private registerIfListener(
    scene: Scene,
    instance: Record<string, Function>,
    methodKey: string,
  ): void {
    const methodRef = instance[methodKey];
    const middlewareFn = methodRef.bind(instance);

    const listenerMetadata = this.metadataAccessor.getListenerMetadata(
      methodRef,
    );
    if (!listenerMetadata) return;

    const { method, args } = listenerMetadata;
    (scene[method] as any)(...args, middlewareFn);
  }
}
