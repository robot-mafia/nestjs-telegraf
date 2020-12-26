import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  UPDATE_LISTENER_TYPE_METADATA,
  TELEGRAF_MODULE_OPTIONS,
  UPDATE_METADATA,
} from './telegraf.constants';
import { ListenerType } from './enums';

@Injectable()
export class TelegrafMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isUpdate(target: Function): boolean {
    return !!this.reflector.get<true | undefined>(UPDATE_METADATA, target);
  }

  getListenerType(target: Function): ListenerType | undefined {
    return this.reflector.get<ListenerType>(
      UPDATE_LISTENER_TYPE_METADATA,
      target,
    );
  }

  getListenerOptions<T>(target: Function): unknown | undefined {
    return this.reflector.get<unknown>(TELEGRAF_MODULE_OPTIONS, target);
  }
}
