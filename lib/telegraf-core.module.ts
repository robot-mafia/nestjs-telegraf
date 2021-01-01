import { DiscoveryModule, ModuleRef } from '@nestjs/core';
import {
  Module,
  DynamicModule,
  Provider,
  Type,
  Global,
  Inject,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import {
  TelegrafModuleOptions,
  TelegrafModuleAsyncOptions,
  TelegrafOptionsFactory,
} from './interfaces';
import {
  TELEGRAF_BOT_NAME,
  TELEGRAF_MODULE_OPTIONS,
} from './telegraf.constants';
import { MetadataAccessorService, UpdatesExplorerService } from './services';
import { getBotToken } from './utils';
import { Telegraf } from 'telegraf';
import { defer } from 'rxjs';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [UpdatesExplorerService, MetadataAccessorService],
})
export class TelegrafCoreModule implements OnApplicationShutdown {
  private readonly logger = new Logger(TelegrafCoreModule.name);

  constructor(
    @Inject(TELEGRAF_BOT_NAME) private readonly botName: string,
    private readonly moduleRef: ModuleRef,
  ) {
    this.logger.debug(botName);
  }

  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    const telegrafBotName = getBotToken(options.botName);

    const telegrafBotProvider = {
      provide: telegrafBotName,
      useFactory: async (): Promise<any> =>
        await defer(async () => {
          const bot = new Telegraf(options.token);
          this.applyBotMiddlewares(bot, options.middlewares);
          await bot.launch(options.launchOptions);
          return bot;
        }).toPromise(),
    };

    return {
      module: TelegrafCoreModule,
      providers: [
        {
          provide: TELEGRAF_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: TELEGRAF_BOT_NAME,
          useValue: telegrafBotName,
        },
        telegrafBotProvider,
      ],
      exports: [telegrafBotProvider],
    };
  }

  public static forRootAsync(
    options: TelegrafModuleAsyncOptions,
  ): DynamicModule {
    const telegrafBotName = getBotToken(options.botName);

    const telegrafBotProvider = {
      provide: telegrafBotName,
      useFactory: async (
        telegrafModuleOptions: TelegrafModuleOptions,
      ): Promise<any> => {
        const { botName, ...telegrafOptions } = telegrafModuleOptions;

        return await defer(async () => {
          const bot = new Telegraf(telegrafOptions.token);
          this.applyBotMiddlewares(bot, telegrafOptions.middlewares);
          await bot.launch(telegrafOptions.launchOptions);
          return bot;
        }).toPromise();
      },
      inject: [TELEGRAF_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: TelegrafCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        {
          provide: TELEGRAF_BOT_NAME,
          useValue: telegrafBotName,
        },
        telegrafBotProvider,
      ],
      exports: [telegrafBotProvider],
    };
  }

  private static applyBotMiddlewares(bot, middlewares) {
    if (middlewares) {
      middlewares.forEach((middleware) => {
        bot.use(middleware);
      });
    }
  }

  private static createAsyncProviders(
    options: TelegrafModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<TelegrafOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: TelegrafModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TELEGRAF_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    // `as Type<TelegrafOptionsFactory>` is a workaround for microsoft/TypeScript#31603
    const inject = [
      (options.useClass || options.useExisting) as Type<TelegrafOptionsFactory>,
    ];
    return {
      provide: TELEGRAF_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TelegrafOptionsFactory) =>
        await optionsFactory.createTelegrafOptions(),
      inject,
    };
  }

  async onApplicationShutdown(): Promise<void> {
    const bot = this.moduleRef.get<any>(this.botName);
    bot && (await bot.stop());
  }
}
