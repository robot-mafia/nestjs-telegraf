import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TelegrafStart } from './decorators';
import { DECORATORS } from './telegraf.constants';

@Injectable()
export class TelegrafMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isTelegrafUse(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.USE, target);
  }

  isTelegrafOn(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.ON, target);
  }

  getTelegrafOnMetadata(target: Type<any> | Function) {
    return this.reflector.get(DECORATORS.ON, target);
  }

  isTelegrafHears(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.HEARS, target);
  }

  getTelegrafHearsMetadata(target: Type<any> | Function) {
    return this.reflector.get(DECORATORS.HEARS, target);
  }

  isTelegrafCommand(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.COMMAND, target);
  }

  getTelegrafCommandMetadata(target: Type<any> | Function) {
    return this.reflector.get(DECORATORS.COMMAND, target);
  }

  isTelegrafStart(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.START, target);
  }

  isTelegrafHelp(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.HELP, target);
  }

  isTelegrafSettings(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.SETTINGS, target);
  }

  isTelegrafEntity(target: Type<any> | Function): boolean {
    if (!target) {
      return false;
    }
    return !!this.reflector.get(DECORATORS.ENTITY, target);
  }

  getTelegrafEntityMetadata(target: Type<any> | Function) {
    return this.reflector.get(DECORATORS.ENTITY, target);
  }
}
