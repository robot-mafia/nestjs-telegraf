import { DiscoveryModule } from '@nestjs/core';
import { Module, DynamicModule, Provider, Type, Global } from '@nestjs/common';
import {
  TelegrafModuleOptions,
  TelegrafModuleAsyncOptions,
  TelegrafOptionsFactory,
} from './interfaces';
import {
  TELEGRAF_MODULE_OPTIONS,
  TELEGRAF_PROVIDER,
} from './telegraf.constants';
import { TelegrafMetadataAccessor } from './telegraf-metadata.accessor';
import { TelegrafExplorer } from './telegraf.explorer';
import { TelegrafProvider } from './telegraf.provider';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [TelegrafMetadataAccessor, TelegrafExplorer],
})
export class TelegrafCoreModule {
  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    const telegrafProvider = {
      provide: TELEGRAF_PROVIDER,
      useClass: TelegrafProvider,
      inject: [TELEGRAF_MODULE_OPTIONS],
    };
    return {
      module: TelegrafCoreModule,
      providers: [
        { provide: TELEGRAF_MODULE_OPTIONS, useValue: options },
        telegrafProvider,
      ],
      exports: [telegrafProvider],
    };
  }

  public static forRootAsync(
    options: TelegrafModuleAsyncOptions,
  ): DynamicModule {
    const telegrafProvider = {
      provide: TELEGRAF_PROVIDER,
      useClass: TelegrafProvider,
      inject: [TELEGRAF_MODULE_OPTIONS],
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: TelegrafCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, telegrafProvider],
      exports: [telegrafProvider],
    };
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
