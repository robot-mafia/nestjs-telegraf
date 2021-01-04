import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  SCENE_METADATA,
  UPDATE_LISTENER_METADATA,
  UPDATE_METADATA,
} from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

@Injectable()
export class MetadataAccessorService {
  constructor(private readonly reflector: Reflector) {}

  isUpdate(target: Function): boolean {
    // TODO: We really need this check?
    if (!target) {
      return false;
    }
    return !!this.reflector.get(UPDATE_METADATA, target);
  }

  isScene(target: Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(SCENE_METADATA, target);
  }

  getListenerMetadata(target: Function): ListenerMetadata | undefined {
    return this.reflector.get(UPDATE_LISTENER_METADATA, target);
  }

  getSceneMetadata(target: Function): string | undefined {
    return this.reflector.get(SCENE_METADATA, target);
  }
}
