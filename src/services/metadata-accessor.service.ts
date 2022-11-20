import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LISTENERS_METADATA, UPDATE_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

@Injectable()
export class MetadataAccessorService {
  constructor(private readonly reflector: Reflector) {}

  isUpdate(target: Function): boolean {
    if (!target) return false;
    return !!this.reflector.get(UPDATE_METADATA, target);
  }

  getListenerMetadata(target: Function): ListenerMetadata[] | undefined {
    return this.reflector.get(LISTENERS_METADATA, target);
  }
}
