import { SetMetadata } from '@nestjs/common';
import { UpdateMethodArgs, UpdateMethods } from '../telegraf.types';
import { UPDATE_LISTENER_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createUpdateDecorator<Method extends UpdateMethods>(
  method: Method,
) {
  return (...args: UpdateMethodArgs<Method>): MethodDecorator => {
    return SetMetadata(UPDATE_LISTENER_METADATA, {
      method,
      args,
    } as ListenerMetadata);
  };
}
