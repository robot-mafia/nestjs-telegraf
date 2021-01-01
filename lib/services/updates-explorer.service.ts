import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { MetadataAccessorService } from './metadata-accessor.service';
import {
  TELEGRAF_BOT_NAME,
  TELEGRAF_MODULE_OPTIONS,
} from '../telegraf.constants';
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
} from '../decorators';
import { Telegraf } from 'telegraf';
import { TelegrafModuleOptions } from '../interfaces';
import { BaseExplorerService } from './base-explorer.service';
import { Module } from '@nestjs/core/injector/module';

@Injectable()
export class UpdatesExplorerService
  extends BaseExplorerService
  implements OnModuleInit {
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
    this.explore();
  }

  explore() {
    const modules = this.getModules(
      this.modulesContainer,
      this.telegrafModuleOptions.include || [],
    );
    const updates = this.flatMap(modules, (instance, moduleRef) =>
      this.applyUpdates(instance, moduleRef),
    );
  }

  private applyUpdates(wrapper: InstanceWrapper, moduleRef: Module) {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    const prototype = Object.getPrototypeOf(instance);

    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    const updateProviders: InstanceWrapper[] = providers.filter(
      (wrapper: InstanceWrapper) =>
        this.metadataAccessor.isUpdate(wrapper.metatype),
    );

    updateProviders.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;
      if (!instance) {
        return undefined;
      }
      this.metadataScanner.scanFromPrototype(instance, prototype, (name) => {
        if (this.metadataAccessor.isUpdateHook(instance[name])) {
          const metadata = this.metadataAccessor.getUpdateHookMetadata(
            instance[name],
          );
          this.handleUpdateHook(instance, name, metadata);
        }
      });
    });

    providers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;
      if (!instance) {
        return undefined;
      }
      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
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
    this.bot.on(metadata.updateType, instance[key].bind(instance));
  }

  handleTelegrafUse(instance: object, key: string) {
    this.bot.use(instance[key].bind(instance));
  }

  handleTelegrafOn(instance: object, key: string, metadata: OnOptions) {
    this.bot.on(metadata.updateTypes, instance[key].bind(instance));
  }

  handleTelegrafHears(instance: object, key: string, metadata: HearsOptions) {
    this.bot.hears(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafCommand(
    instance: object,
    key: string,
    metadata: CommandOptions,
  ) {
    this.bot.command(metadata.commands, instance[key].bind(instance));
  }

  handleTelegrafStart(instance: object, key: string) {
    this.bot.start(instance[key].bind(instance));
  }

  handleTelegrafHelp(instance: object, key: string) {
    this.bot.help(instance[key].bind(instance));
  }

  handleTelegrafSettings(instance: object, key: string) {
    // @ts-ignore
    this.bot.settings(instance[key].bind(instance));
  }

  handleTelegrafEntity(instance: object, key: string, metadata: EntityOptions) {
    // @ts-ignore
    this.bot.entity(metadata.entity, instance[key].bind(instance));
  }

  handleTelegrafMention(
    instance: object,
    key: string,
    metadata: MentionOptions,
  ) {
    // @ts-ignore
    this.bot.mention(metadata.username, instance[key].bind(instance));
  }

  handleTelegrafPhone(instance: object, key: string, metadata: PhoneOptions) {
    // @ts-ignore
    this.bot.phone(metadata.phone, instance[key].bind(instance));
  }

  handleTelegrafHashtag(
    instance: object,
    key: string,
    metadata: HashtagOptions,
  ) {
    // @ts-ignore
    this.bot.hashtag(metadata.hashtag, instance[key].bind(instance));
  }

  handleTelegrafCashtag(
    instance: object,
    key: string,
    metadata: CashtagOptions,
  ) {
    // @ts-ignore
    this.bot.cashtag(metadata.cashtag, instance[key].bind(instance));
  }

  handleTelegrafAction(instance: object, key: string, metadata: ActionOptions) {
    this.bot.action(metadata.triggers, instance[key].bind(instance));
  }

  handleTelegrafInlineQuery(
    instance: object,
    key: string,
    metadata: InlineQueryOptions,
  ) {
    if (metadata.triggers) {
      // @ts-ignore
      this.bot.inlineQuery(metadata.triggers, instance[key].bind(instance));
    } else {
      this.bot.on(metadata.updateType, instance[key].bind(instance));
    }
  }

  handleTelegrafGameQuery(instance: object, key: string) {
    this.bot.gameQuery(instance[key].bind(instance));
  }
}
