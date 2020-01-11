import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
  Provider,
} from '@nestjs/common'
import { TelegramBot } from './TelegramBot'
import {
  TelegrafModuleAsyncOptions,
  TelegrafOptionsFactory,
} from './interfaces'
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants'
import { TokenInjectionToken } from './TokenInjectionToken'
import { TelegramClient } from './TelegramClient'

@Module({})
export class TelegrafModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }

  static fromFactory(options: TelegrafModuleAsyncOptions): DynamicModule {
    return {
      module: TelegrafModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        TelegramBot,
        TelegramClient,
        {
          provide: TokenInjectionToken,
          useClass: options.useClass,
        },
      ],
      exports: [TelegramBot, TelegramClient],
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
