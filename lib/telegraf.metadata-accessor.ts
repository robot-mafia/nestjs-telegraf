import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  UPDATE_LISTENER_METHOD_METADATA,
  UPDATE_METADATA,
  UPDATE_LISTENER_OPTIONS_METADATA,
} from './telegraf.constants';
import { ListenerMethod } from './enums';

@Injectable()
export class TelegrafMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isUpdate(target: Function): boolean {
    return !!this.reflector.get(UPDATE_METADATA, target);
  }

  getListenerMethod(target: Function): ListenerMethod | undefined {
    return this.reflector.get(UPDATE_LISTENER_METHOD_METADATA, target);
  }

  getListenerOptions(target: Function): unknown[] {
    return this.reflector.get(UPDATE_LISTENER_OPTIONS_METADATA, target) || [];
  }
}
