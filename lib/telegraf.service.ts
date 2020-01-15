import { Injectable, Inject, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { flatten, head } from 'lodash';

import { TelegramCatch, TelegramActionHandler } from './decorators';
import { TokenInjectionToken } from './telegraf.constants';
import {
  TelegrafOptionsFactory,
  TelegramErrorHandler,
  Handler,
  ContextTransformer
} from './interfaces';
import { InvalidConfigurationException } from './exeptions';

@Injectable()
export class TelegrafService {
  private readonly logger = new Logger(TelegrafService.name, true);
  private readonly sitePublicUrl?: string;
  private readonly bot: Telegraf<ContextMessageUpdate>;
  private ref: ModuleRef;

  public constructor(
    @Inject(TokenInjectionToken) options: TelegrafOptionsFactory
  ) {
    const { token, sitePublicUrl } = options.createTelegrafOptions();
    this.sitePublicUrl = sitePublicUrl;
    this.bot = new Telegraf(token);
  }

  public init(ref: ModuleRef, devMode: boolean = false) {
    this.ref = ref;

    const handlers = this.createHandlers();

    this.setupOnStart(handlers);
    this.setupOnMessage(handlers);
    this.setupOnCommand(handlers);
    this.setupActions(handlers);

    if (devMode) {
      this.startPolling();
    }
  }

  public getMiddleware(path: string) {
    if (!this.sitePublicUrl) {
      throw new InvalidConfigurationException(
        'sitePublicUrl',
        'does not exist, but webook used'
      );
    }

    const url = `${this.sitePublicUrl}/${path}`;

    this.bot.telegram
      .setWebhook(url)
      .then(() => this.logger.log(`Webhook set success @ ${url}`));

    return this.bot.webhookCallback(`/${path}`);
  }

  public startPolling() {
    this.bot.telegram.deleteWebhook().then(
      () => this.bot.startPolling(),
      () => {
        // okay, never mind
      }
    );
  }

  private createHandlers(): Handler[] {
    return flatten(
      Array.from((TelegramActionHandler.handlers || new Map()).entries()).map(
        ([handlerClass, classConfig]) => {
          const handlerInstance = this.ref.get(handlerClass, { strict: false });

          return Array.from(classConfig.entries()).map(
            ([methodName, methodCondig]) => ({
              handle: handlerInstance[methodName].bind(handlerInstance),
              config: methodCondig
            })
          );
        }
      )
    );
  }

  private setupOnStart(handlers: Handler[]): void {
    const onStart = handlers.filter(({ config }) => config.onStart);

    if (onStart.length !== 1) {
      throw new Error();
    }

    this.bot.start(this.adoptHandle(head(onStart)));
  }

  private setupOnMessage(handlers: Handler[]): void {
    const onMessageHandlers = handlers.filter(({ config }) => config.message);

    onMessageHandlers.forEach(handler => {
      this.bot.hears(handler.config.message, this.adoptHandle(handler));
    });
  }

  private setupOnCommand(handlers: Handler[]): void {
    const commandHandlers = handlers.filter(({ config }) => config.command);

    commandHandlers.forEach(handler => {
      this.bot.command(handler.config.command, this.adoptHandle(handler));
    });
  }

  private setupActions(handlers: Handler[]): void {
    const commandHandlers = handlers.filter(({ config }) => config.action);

    commandHandlers.forEach(handler => {
      console.log(handler);
      this.bot.action(handler.config.action, this.adoptHandle(handler));
    });
  }

  private adoptHandle({ handle, config }: Handler) {
    const errorHandler = this.createCatch();

    return async (ctx: ContextMessageUpdate) => {
      const args = await Promise.all(
        (config.transformations || [])
          .sort((a, b) => a.index - b.index)
          .map(({ transform }) =>
            this.ref
              .get<ContextTransformer>(transform, { strict: false })
              .transform(ctx)
          )
      );

      return handle(ctx, ...args).catch(errorHandler(ctx));
    };
  }

  private createCatch() {
    const handlers = Array.from(
      (TelegramCatch.handlers || new Map()).entries()
    ).map(([errorType, handlerType]) => {
      const handler = this.ref.get<TelegramErrorHandler>(handlerType, {
        strict: false
      });

      return {
        errorType,
        handler
      };
    });

    return (ctx: ContextMessageUpdate) => (e: any) => {
      for (const { errorType, handler } of handlers) {
        if (e instanceof (errorType as any)) {
          return handler.catch(ctx, e);
        }
      }

      throw e;
    };
  }
}
