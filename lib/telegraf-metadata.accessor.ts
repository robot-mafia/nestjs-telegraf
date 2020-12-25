import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  TELEGRAF_LISTENER_TYPE,
  TELEGRAF_MODULE_OPTIONS,
} from './telegraf.constants';
import { ListenerType } from './enums/listener-type.enum';

@Injectable()
export class TelegrafMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getListenerType(target: Function): ListenerType | undefined {
    return this.reflector.get<ListenerType>(TELEGRAF_LISTENER_TYPE, target);
  }

  getListenerOptions<T>(target: Function): unknown | undefined {
    return this.reflector.get<unknown>(TELEGRAF_MODULE_OPTIONS, target);
  }
}
