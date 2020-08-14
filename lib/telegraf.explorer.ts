import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { TelegrafMetadataAccessor } from './telegraf-metadata.accessor';
import { TelegrafProvider } from './telegraf.provider';
import { TELEGRAF_PROVIDER } from './telegraf.constants';
import {
  ActionOptions,
  CashtagOptions,
  CommandOptions,
  EntityOptions,
  HashtagOptions,
  HearsOptions,
  InlineQueryOptions,
  MentionOptions,
  OnOptions,
  PhoneOptions,
} from './decorators';

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

      const telegraf: TelegrafProvider = this.moduleRef.get<TelegrafProvider>(
        TELEGRAF_PROVIDER,
        {
          strict: false,
        },
      );

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => {
          if (this.metadataAccessor.isTelegrafUse(instance[key])) {
            this.handleTelegrafUse(instance, key, telegraf);
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
          } else if (this.metadataAccessor.isTelegrafStart(instance[key])) {
            this.handleTelegrafStart(instance, key, telegraf);
          } else if (this.metadataAccessor.isTelegrafHelp(instance[key])) {
            this.handleTelegrafHelp(instance, key, telegraf);
          } else if (this.metadataAccessor.isTelegrafSettings(instance[key])) {
            this.handleTelegrafSettings(instance, key, telegraf);
          } else if (this.metadataAccessor.isTelegrafEntity(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafEntityMetadata(
              instance[key],
            );
            this.handleTelegrafEntity(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafMention(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafMentionMetadata(
              instance[key],
            );
            this.handleTelegrafMention(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafPhone(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafPhoneMetadata(
              instance[key],
            );
            this.handleTelegrafPhone(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafHashtag(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafHashtagMetadata(
              instance[key],
            );
            this.handleTelegrafHashtag(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafCashtag(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafCashtagMetadata(
              instance[key],
            );
            this.handleTelegrafCashtag(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafAction(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafActionMetadata(
              instance[key],
            );
            this.handleTelegrafAction(instance, key, telegraf, metadata);
          } else if (
            this.metadataAccessor.isTelegrafInlineQuery(instance[key])
          ) {
            const metadata = this.metadataAccessor.getTelegrafInlineQueryMetadata(
              instance[key],
            );
            this.handleTelegrafInlineQuery(instance, key, telegraf, metadata);
          } else if (this.metadataAccessor.isTelegrafGameQuery(instance[key])) {
            this.handleTelegrafGameQuery(instance, key, telegraf);
          }
        },
      );
    });
  }

  handleTelegrafUse(instance: object, key: string, telegraf: TelegrafProvider) {
    telegraf.use(instance[key].bind(instance));
  }

  handleTelegrafOn(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: OnOptions,
  ) {
    telegraf.on(metadata.updateTypes, instance[key].bind(instance));
  }

  handleTelegrafHears(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: HearsOptions,
  ) {
    telegraf.hears(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafCommand(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: CommandOptions,
  ) {
    telegraf.command(metadata.commands, instance[key].bind(instance));
  }

  handleTelegrafStart(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
  ) {
    telegraf.start(instance[key].bind(instance));
  }

  handleTelegrafHelp(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
  ) {
    telegraf.help(instance[key].bind(instance));
  }

  handleTelegrafSettings(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
  ) {
    // @ts-ignore
    telegraf.settings(instance[key].bind(instance));
  }

  handleTelegrafEntity(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: EntityOptions,
  ) {
    // @ts-ignore
    telegraf.entity(metadata.entity, instance[key].bind(instance));
  }

  handleTelegrafMention(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: MentionOptions,
  ) {
    // @ts-ignore
    telegraf.mention(metadata.username, instance[key].bind(instance));
  }

  handleTelegrafPhone(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: PhoneOptions,
  ) {
    // @ts-ignore
    telegraf.phone(metadata.phone, instance[key].bind(instance));
  }

  handleTelegrafHashtag(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: HashtagOptions,
  ) {
    // @ts-ignore
    telegraf.hashtag(metadata.hashtag, instance[key].bind(instance));
  }

  handleTelegrafCashtag(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: CashtagOptions,
  ) {
    // @ts-ignore
    telegraf.cashtag(metadata.cashtag, instance[key].bind(instance));
  }

  handleTelegrafAction(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: ActionOptions,
  ) {
    telegraf.action(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafInlineQuery(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
    metadata: InlineQueryOptions,
  ) {
    // @ts-ignore
    telegraf.inlineQuery(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafGameQuery(
    instance: object,
    key: string,
    telegraf: TelegrafProvider,
  ) {
    telegraf.gameQuery(instance[key].bind(instance));
  }
}
