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
  UpdateHookOptions,
} from './decorators';

@Injectable()
export class TelegrafExplorer implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: TelegrafMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  private telegraf: TelegrafProvider;

  onModuleInit() {
    this.telegraf = this.moduleRef.get<TelegrafProvider>(TELEGRAF_PROVIDER, {
      strict: false,
    });
    this.explore();
  }

  explore() {
    /**
     * Update providers section is only for decorators under Update decorator
     */
    const updateProviders: InstanceWrapper[] = this.discoveryService
      .getProviders()
      .filter((wrapper: InstanceWrapper) =>
        this.metadataAccessor.isUpdate(wrapper.metatype),
      );

    updateProviders.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => {
          if (this.metadataAccessor.isUpdateHook(instance[key])) {
            const metadata = this.metadataAccessor.getUpdateHookMetadata(
              instance[key],
            );
            this.handleUpdateHook(instance, key, metadata);
          }
        },
      );
    });

    const providers: InstanceWrapper[] = this.discoveryService.getProviders();

    providers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      if (!instance) {
        return;
      }

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => {
          if (this.metadataAccessor.isTelegrafUse(instance[key])) {
            this.handleTelegrafUse(instance, key);
          } else if (this.metadataAccessor.isTelegrafOn(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafOnMetadata(
              instance[key],
            );
            this.handleTelegrafOn(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafHears(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafHearsMetadata(
              instance[key],
            );
            this.handleTelegrafHears(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafCommand(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafCommandMetadata(
              instance[key],
            );
            this.handleTelegrafCommand(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafStart(instance[key])) {
            this.handleTelegrafStart(instance, key);
          } else if (this.metadataAccessor.isTelegrafHelp(instance[key])) {
            this.handleTelegrafHelp(instance, key);
          } else if (this.metadataAccessor.isTelegrafSettings(instance[key])) {
            this.handleTelegrafSettings(instance, key);
          } else if (this.metadataAccessor.isTelegrafEntity(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafEntityMetadata(
              instance[key],
            );
            this.handleTelegrafEntity(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafMention(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafMentionMetadata(
              instance[key],
            );
            this.handleTelegrafMention(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafPhone(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafPhoneMetadata(
              instance[key],
            );
            this.handleTelegrafPhone(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafHashtag(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafHashtagMetadata(
              instance[key],
            );
            this.handleTelegrafHashtag(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafCashtag(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafCashtagMetadata(
              instance[key],
            );
            this.handleTelegrafCashtag(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafAction(instance[key])) {
            const metadata = this.metadataAccessor.getTelegrafActionMetadata(
              instance[key],
            );
            this.handleTelegrafAction(instance, key, metadata);
          } else if (
            this.metadataAccessor.isTelegrafInlineQuery(instance[key])
          ) {
            const metadata = this.metadataAccessor.getTelegrafInlineQueryMetadata(
              instance[key],
            );
            this.handleTelegrafInlineQuery(instance, key, metadata);
          } else if (this.metadataAccessor.isTelegrafGameQuery(instance[key])) {
            this.handleTelegrafGameQuery(instance, key);
          }
        },
      );
    });
  }

  handleUpdateHook(instance: object, key: string, metadata: UpdateHookOptions) {
    this.telegraf.on(metadata.updateType, instance[key].bind(instance));
  }

  handleTelegrafUse(instance: object, key: string) {
    this.telegraf.use(instance[key].bind(instance));
  }

  handleTelegrafOn(instance: object, key: string, metadata: OnOptions) {
    this.telegraf.on(metadata.updateTypes, instance[key].bind(instance));
  }

  handleTelegrafHears(instance: object, key: string, metadata: HearsOptions) {
    this.telegraf.hears(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafCommand(
    instance: object,
    key: string,
    metadata: CommandOptions,
  ) {
    this.telegraf.command(metadata.commands, instance[key].bind(instance));
  }

  handleTelegrafStart(instance: object, key: string) {
    this.telegraf.start(instance[key].bind(instance));
  }

  handleTelegrafHelp(instance: object, key: string) {
    this.telegraf.help(instance[key].bind(instance));
  }

  handleTelegrafSettings(instance: object, key: string) {
    this.telegraf.settings(instance[key].bind(instance));
  }

  handleTelegrafEntity(instance: object, key: string, metadata: EntityOptions) {
    this.telegraf.entity(metadata.entity, instance[key].bind(instance));
  }

  handleTelegrafMention(
    instance: object,
    key: string,
    metadata: MentionOptions,
  ) {
    this.telegraf.mention(metadata.username, instance[key].bind(instance));
  }

  handleTelegrafPhone(instance: object, key: string, metadata: PhoneOptions) {
    this.telegraf.phone(metadata.phone, instance[key].bind(instance));
  }

  handleTelegrafHashtag(
    instance: object,
    key: string,
    metadata: HashtagOptions,
  ) {
    this.telegraf.hashtag(metadata.hashtag, instance[key].bind(instance));
  }

  handleTelegrafCashtag(
    instance: object,
    key: string,
    metadata: CashtagOptions,
  ) {
    this.telegraf.cashtag(metadata.cashtag, instance[key].bind(instance));
  }

  handleTelegrafAction(instance: object, key: string, metadata: ActionOptions) {
    this.telegraf.action(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafInlineQuery(
    instance: object,
    key: string,
    metadata: InlineQueryOptions,
  ) {
    if (metadata.triggers) {
      this.telegraf.inlineQuery(
        metadata.triggers,
        instance[key].bind(instance),
      );
    } else {
      this.telegraf.on(metadata.updateType, instance[key].bind(instance));
    }
  }

  handleTelegrafGameQuery(instance: object, key: string) {
    this.telegraf.gameQuery(instance[key].bind(instance));
  }
}
