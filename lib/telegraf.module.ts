import { DiscoveryModule, ModuleRef } from '@nestjs/core';
import {
  DynamicModule,
  Inject,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { Telegraf } from 'telegraf';
import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
  TelegrafOptionsFactory,
} from './interfaces';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';
import { TelegrafMetadataAccessor } from './telegraf.metadata-accessor';
import { TelegrafUpdateExplorer } from './explorers/telegraf-update.explorer';
import { TelegrafSceneExplorer } from './explorers/telegraf-scene.explorer';
import { createProviders, TelegrafProvider } from './telegraf.providers';

@Module({
  imports: [DiscoveryModule],
  providers: [
    TelegrafMetadataAccessor,
    TelegrafSceneExplorer,
    TelegrafUpdateExplorer,
  ],
})
export class TelegrafModule
  implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly options: TelegrafModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const { launchOptions } = this.options;
    const telegraf = this.moduleRef.get(Telegraf);
    await telegraf.launch(launchOptions);
  }

  async onApplicationShutdown(): Promise<void> {
    const telegraf = this.moduleRef.get(Telegraf);
    await telegraf.stop();
  }

  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    const providers = [...createProviders(options), TelegrafProvider];

    return {
      module: TelegrafModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(
    options: TelegrafModuleAsyncOptions,
  ): DynamicModule {
    const providers = [...this.createAsyncProviders(options), TelegrafProvider];

    return {
      module: TelegrafModule,
      imports: options.imports || [],
      providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(
    options: TelegrafModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
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

    return {
      provide: TELEGRAF_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TelegrafOptionsFactory) =>
        await optionsFactory.createTelegrafOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
