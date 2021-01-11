import { SetMetadata } from '@nestjs/common';
import { Composer } from 'telegraf';
import { ComposerMethodArgs, OnlyFunctionPropertyNames } from '../types';
import { LISTENER_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createListenerDecorator<
  TComposer extends Composer<never>,
  TMethod extends OnlyFunctionPropertyNames<TComposer> = OnlyFunctionPropertyNames<TComposer>
>(method: TMethod) {
  return (...args: ComposerMethodArgs<TComposer, TMethod>): MethodDecorator => {
    return SetMetadata(LISTENER_METADATA, {
      method,
      args,
    } as ListenerMetadata);
  };
}
