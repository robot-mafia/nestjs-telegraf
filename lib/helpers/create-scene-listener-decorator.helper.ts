import { SetMetadata } from '@nestjs/common';
import { BaseScene as Scene } from 'telegraf';
import { ComposerMethodArgs, SceneMethods } from '../telegraf.types';
import { UPDATE_LISTENER_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createSceneListenerDecorator<Method extends SceneMethods>(
  method: Method,
) {
  return (
    ...args: ComposerMethodArgs<Scene<never>, Method>
  ): MethodDecorator => {
    return SetMetadata(UPDATE_LISTENER_METADATA, {
      method,
      args,
    } as ListenerMetadata);
  };
}
