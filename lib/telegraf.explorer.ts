import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import Telegraf from 'telegraf';
import { TelegrafMetadataAccessor } from './telegraf-metadata.accessor';
import { TelegrafProvider } from './telegraf.provider';
import { TELEGRAF_PROVIDER } from './telegraf.constants';
import { ContextMessageUpdate } from 'telegraf';

@Injectable()
export class TelegrafExplorer implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: TelegrafMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit() {
    this.explore();
  }

  explore() {
    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    providers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      if (!instance) {
        return;
      }

      const telegraf = this.moduleRef.get<TelegrafProvider<any>>(
        TELEGRAF_PROVIDER,
        { strict: false },
      );

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => {
          if (this.metadataAccessor.isTelegrafUse(instance[key])) {
            this.handleTelegrafUse(instance, key, telegraf);
          } else if (this.metadataAccessor.isTelegrafStart(instance[key])) {
            this.handleTelegrafStart(instance, key, telegraf);
          } else if (this.metadataAccessor.isTelegrafOn(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafOnMetadata(
              instance[key],
            );
            this.handleTelegrafOn(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafHears(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafHearsMetadata(
              instance[key],
            );
            this.handleTelegrafHears(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafCommand(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafCommandMetadata(
              instance[key],
            );
            this.handleTelegrafCommand(instance, key, telegraf, metadata);
          }
        },
      );
    });
  }

  handleTelegrafUse(
    instance: object,
    key: string,
    telegraf: Telegraf<ContextMessageUpdate>,
  ) {
    telegraf.use(instance[key].bind(instance));
  }

  handleTelegrafOn(
    instance: object,
    key: string,
    telegraf: Telegraf<ContextMessageUpdate>,
    metadata: any,
  ) {
    telegraf.on(metadata.updateTypes, instance[key].bind(instance));
  }

  handleTelegrafStart(
    instance: object,
    key: string,
    telegraf: Telegraf<ContextMessageUpdate>,
  ) {
    telegraf.start(instance[key].bind(instance));
  }

  handleTelegrafHears(
    instance: object,
    key: string,
    telegraf: Telegraf<ContextMessageUpdate>,
    metadata: any,
  ) {
    telegraf.hears(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafCommand(
    instance: object,
    key: string,
    telegraf: Telegraf<ContextMessageUpdate>,
    metadata: any,
  ) {
    telegraf.command(metadata.commands, instance[key].bind(instance));
  }
}
