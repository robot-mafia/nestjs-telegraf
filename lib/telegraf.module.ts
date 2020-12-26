import { DiscoveryModule } from '@nestjs/core';
import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  TelegrafModuleOptions,
  TelegrafModuleAsyncOptions,
  TelegrafOptionsFactory,
} from './interfaces';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';
import { TelegrafMetadataAccessor } from './telegraf-metadata.accessor';
import { TelegrafExplorer } from './telegraf.explorer';
import { TelegrafProvider } from './telegraf.provider';

@Module({
  imports: [DiscoveryModule],
  providers: [TelegrafMetadataAccessor, TelegrafExplorer],
})
export class TelegrafModule {
  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    const providers = [...this.createProviders(options), TelegrafProvider];

    return {
      module: TelegrafModule,
      providers,
      exports: providers,
    };
  }

  private static createProviders(options: TelegrafModuleOptions): Provider[] {
    return [
      {
        provide: TELEGRAF_MODULE_OPTIONS,
        useValue: options,
      },
    ];
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
