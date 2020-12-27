import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  UPDATE_LISTENER_METADATA,
  UPDATE_METADATA,
} from './telegraf.constants';
import { ListenerMetadata } from './interfaces/listener-metadata.interface';

@Injectable()
export class TelegrafMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isUpdate(target: Function): boolean {
    return !!this.reflector.get(UPDATE_METADATA, target);
  }

  getListenerMetadata(target: Function): ListenerMetadata | undefined {
    return this.reflector.get(UPDATE_LISTENER_METADATA, target);
  }
}
