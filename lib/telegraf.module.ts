import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { TelegramBot } from './TelegramBot'
import { TelegrafModuleAsyncOptions } from './interfaces'
import { TokenInjectionToken } from './TokenInjectionToken'
import { TelegramClient } from './TelegramClient'

@Module({})
export class TelegrafModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }

  static fromFactory(factory: TelegrafModuleAsyncOptions): DynamicModule {
    return {
      module: TelegrafModule,
      providers: [
        TelegramBot,
        TelegramClient,
        {
          provide: TokenInjectionToken,
          useClass: factory.useClass,
        },
      ],
      exports: [TelegramBot, TelegramClient],
    }
  }
}
