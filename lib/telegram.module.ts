import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { ModuleMetadata, Type } from '@nestjs/common/interfaces'

import { TelegramBot } from './TelegramBot'
import { TelegramModuleOptionsFactory } from './TelegramModuleOptionsFactory'
import { TokenInjectionToken } from './TokenInjectionToken'
import { TelegramClient } from './TelegramClient'

interface TelegramFactory extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<TelegramModuleOptionsFactory>
  inject?: any[]
}

@Module({})
export class TelegramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }

  static fromFactory(factory: TelegramFactory): DynamicModule {
    return {
      module: TelegramModule,
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
