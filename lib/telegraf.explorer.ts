import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Composer } from 'telegraf';
import { TelegrafMetadataAccessor } from './telegraf.metadata-accessor';
import { TelegrafProvider } from './telegraf.provider';

@Injectable()
export class TelegrafExplorer implements OnModuleInit {
  constructor(
    private readonly telegraf: TelegrafProvider,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: TelegrafMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit(): void {
    this.explore();
  }

  explore(): void {
    const updateClasses = this.filterUpdateClasses();

    updateClasses.forEach((wrapper) => {
      const { instance } = wrapper;

      const prototype = Object.getPrototypeOf(instance);
      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        (methodKey: string) => this.registerIfListener(instance, methodKey),
      );
    });
  }

  private filterUpdateClasses(): InstanceWrapper[] {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.instance)
      .filter((wrapper) =>
        this.metadataAccessor.isUpdate(wrapper.instance.constructor),
      );
  }

  private registerIfListener(
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
    const composerMiddlewareFn = Composer[method](...args, middlewareFn);

    console.log('composerMiddlewareFn', composerMiddlewareFn);

    this.telegraf.use(composerMiddlewareFn);
  }
}
