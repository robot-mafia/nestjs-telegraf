import { SetMetadata } from '@nestjs/common';
import { BaseScene as Scene } from 'telegraf';
import { ComposerMethodArgs, SceneMethods } from '../types';
import { LISTENER_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createListenerDecorator<TMethod extends SceneMethods>(
  method: TMethod,
) {
  return (
    ...args: ComposerMethodArgs<Scene<never>, TMethod>
  ): MethodDecorator => {
    return SetMetadata(LISTENER_METADATA, {
      method,
      args,
    } as ListenerMetadata);
  };
}

export function createMissedListenerDecorator<TArgs extends any[]>(
  method: string,
) {
  return (...args: TArgs): MethodDecorator => {
    return SetMetadata(LISTENER_METADATA, {
      method,
      args,
    } as ListenerMetadata);
  };
}
