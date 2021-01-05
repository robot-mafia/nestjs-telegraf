import { DiscoveryModule, ModuleRef } from '@nestjs/core';
import {
  Module,
  DynamicModule,
  Provider,
  Type,
  Global,
  Inject,
  OnApplicationShutdown,
} from '@nestjs/common';
import {
  TelegrafModuleOptions,
  TelegrafModuleAsyncOptions,
  TelegrafOptionsFactory,
} from './interfaces';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';
import { MetadataAccessorService, ListenersExplorerService } from './services';
import { getBotToken, createBotFactory } from './utils';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [ListenersExplorerService, MetadataAccessorService],
})
export class TelegrafCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly options: TelegrafModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    const telegrafBotProvider: Provider = {
      provide: getBotToken(options.name),
      useFactory: async () => await createBotFactory(options),
    };

    return {
      module: TelegrafCoreModule,
      providers: [
        {
          provide: TELEGRAF_MODULE_OPTIONS,
          useValue: options,
        },
        telegrafBotProvider,
      ],
      exports: [telegrafBotProvider],
    };
  }

  public static forRootAsync(
    options: TelegrafModuleAsyncOptions,
  ): DynamicModule {
    const telegrafBotName = getBotToken(options.name);

    const telegrafBotProvider: Provider = {
      provide: telegrafBotName,
      useFactory: async (options: TelegrafModuleOptions) =>
        await createBotFactory(options),
      inject: [TELEGRAF_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: TelegrafCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, telegrafBotProvider],
      exports: [telegrafBotProvider],
    };
  }

  async onApplicationShutdown(): Promise<void> {
    const botName = getBotToken(this.options.name);
    const bot = this.moduleRef.get<any>(botName);
    bot && (await bot.stop());
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
}
