import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { TelegrafMetadataAccessor } from './telegraf.metadata-accessor';
import { TelegrafProvider } from './telegraf.provider';
import { ListenerType } from './enums';
import {
  ActionOptions,
  CashtagOptions,
  CommandOptions,
  EmailOptions,
  HashtagOptions,
  HearsOptions,
  InlineQueryOptions,
  MentionOptions,
  OnOptions,
  PhoneOptions,
  TextLinkOptions,
  TextMentionOptions,
  UrlOptions,
} from './decorators';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class TelegrafExplorer implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: TelegrafMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  private telegraf: TelegrafProvider;

  onModuleInit(): void {
    this.telegraf = this.moduleRef.get<TelegrafProvider>(TelegrafProvider, {
      strict: false,
    });
    this.explore();
  }

  explore(): void {
    const updateInstanceWrappers = this.filterUpdateClass();

    updateInstanceWrappers.forEach((wrapper) => {
      const { instance } = wrapper;

      const prototype = Object.getPrototypeOf(instance);
      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        (methodKey: string) =>
          this.registerIfUpdateListener(instance, methodKey),
      );
    });
  }

  private filterUpdateClass(): InstanceWrapper[] {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.instance)
      .filter((wrapper) => this.metadataAccessor.isUpdate(wrapper.instance));
  }

  private registerIfUpdateListener(
    instance: Record<string, Function>,
    methodKey: string,
  ): void {
    const methodRef = instance[methodKey];
    const middlewareFn = methodRef.bind(instance);

    const listenerType = this.metadataAccessor.getListenerType(methodRef);
    if (!listenerType) return;

    const listenerOptions = this.metadataAccessor.getListenerOptions(methodRef);

    switch (listenerType) {
      case ListenerType.On: {
        const { updateTypes } = listenerOptions as OnOptions;
        this.telegraf.on(updateTypes, middlewareFn);
        break;
      }
      case ListenerType.Use: {
        this.telegraf.use(middlewareFn);
        break;
      }
      case ListenerType.Start: {
        this.telegraf.start(middlewareFn);
        break;
      }
      case ListenerType.Help: {
        this.telegraf.help(middlewareFn);
        break;
      }
      case ListenerType.Settings: {
        this.telegraf.settings(middlewareFn);
        break;
      }
      case ListenerType.Hears: {
        const { triggers } = listenerOptions as HearsOptions;
        this.telegraf.hears(triggers, middlewareFn);
        break;
      }
      case ListenerType.Command: {
        const { command } = listenerOptions as CommandOptions;
        this.telegraf.command(command, middlewareFn);
        break;
      }
      case ListenerType.Action: {
        const { triggers } = listenerOptions as ActionOptions;
        this.telegraf.action(triggers, middlewareFn);
        break;
      }
      case ListenerType.Mention: {
        const { mention } = listenerOptions as MentionOptions;
        this.telegraf.mention(mention, middlewareFn);
        break;
      }
      case ListenerType.Phone: {
        const { phone } = listenerOptions as PhoneOptions;
        this.telegraf.phone(phone, middlewareFn);
        break;
      }
      case ListenerType.Hashtag: {
        const { hashtag } = listenerOptions as HashtagOptions;
        this.telegraf.hashtag(hashtag, middlewareFn);
        break;
      }
      case ListenerType.Cashtag: {
        const { cashtag } = listenerOptions as CashtagOptions;
        this.telegraf.cashtag(cashtag, middlewareFn);
        break;
      }
      case ListenerType.Email: {
        const { email } = listenerOptions as EmailOptions;
        this.telegraf.email(email, middlewareFn);
        break;
      }
      case ListenerType.Url: {
        const { url } = listenerOptions as UrlOptions;
        this.telegraf.url(url, middlewareFn);
        break;
      }
      case ListenerType.TextLink: {
        const { link } = listenerOptions as TextLinkOptions;
        this.telegraf.textLink(link, middlewareFn);
        break;
      }
      case ListenerType.TextMention: {
        const { mention } = listenerOptions as TextMentionOptions;
        this.telegraf.textMention(mention, middlewareFn);
        break;
      }
      case ListenerType.InlineQuery: {
        const { triggers } = listenerOptions as InlineQueryOptions;
        this.telegraf.inlineQuery(triggers, middlewareFn);
        break;
      }
      case ListenerType.GameQuery: {
        this.telegraf.gameQuery(middlewareFn);
        break;
      }
    }
  }
}
