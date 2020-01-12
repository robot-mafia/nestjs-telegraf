import { Module, DynamicModule, Provider } from '@nestjs/common'
import { TelegrafModuleAsyncOptions, TelegrafOptionsFactory } from './interfaces'
import { TELEGRAF_MODULE_OPTIONS, TokenInjectionToken } from './telegraf.constants'
import { TelegrafService, TelegrafTelegramService } from './'

@Module({})
export class TelegrafModule {
  static fromFactory(options: TelegrafModuleAsyncOptions): DynamicModule {
    return {
      module: TelegrafModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        TelegrafService,
        TelegrafTelegramService,
        {
          provide: TokenInjectionToken,
          useClass: options.useClass,
        },
      ],
      exports: [TelegrafService, TelegrafTelegramService],
    }
  }

  private static createAsyncProviders(
    options: TelegrafModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ]
  }

  private static createAsyncOptionsProvider(
    options: TelegrafModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TELEGRAF_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    return {
      provide: TELEGRAF_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TelegrafOptionsFactory) =>
        await optionsFactory.createTelegrafOptions(),
      inject: [options.useExisting || options.useClass],
    }
  }
}
