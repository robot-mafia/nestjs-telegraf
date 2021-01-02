import { SetMetadata } from '@nestjs/common';
import { Composer } from 'telegraf';
import { ComposerMethodArgs, UpdateMethods } from '../telegraf.types';
import { UPDATE_LISTENER_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createUpdateListenerDecorator<Method extends UpdateMethods>(
  method: Method,
) {
  return (
    ...args: ComposerMethodArgs<Composer<never>, Method>
  ): MethodDecorator => {
    return SetMetadata(UPDATE_LISTENER_METADATA, {
      method,
      args,
    } as ListenerMetadata);
  };
}
