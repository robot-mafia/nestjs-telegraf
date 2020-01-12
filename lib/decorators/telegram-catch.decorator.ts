import { Type } from '@nestjs/common'
import { TelegramErrorHandler } from '../interfaces'

type Decorator = (error: any) => ClassDecorator

type HandlerDecorator = Decorator & {
  handlers?: Map<Error, Type<TelegramErrorHandler>>
}

export const TelegramCatch: HandlerDecorator = error => target => {
  if (!TelegramCatch.handlers) {
    TelegramCatch.handlers = new Map()
  }

  TelegramCatch.handlers.set(error, target as any)

  return target
}
