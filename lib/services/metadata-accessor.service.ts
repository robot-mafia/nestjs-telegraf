import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  SCENE_METADATA,
  LISTENERS_METADATA,
  GLOBAL_UPDATE_METADATA,
  UPDATE_METADATA,
  WIZARD_STEP_METADATA,
} from '../telegraf.constants';
import {
  ListenerMetadata,
  SceneMetadata,
  WizardStepMetadata,
} from '../interfaces';

@Injectable()
export class MetadataAccessorService {
  constructor(private readonly reflector: Reflector) {}

  isGlobalUpdate(target: Function): boolean {
    if (!target) return false;
    return !!this.reflector.get(GLOBAL_UPDATE_METADATA, target);
  }

  isUpdate(target: Function): boolean {
    if (!target) return false;
    return !!this.reflector.get(UPDATE_METADATA, target);
  }

  isScene(target: Function): boolean {
    if (!target) return false;
    return !!this.reflector.get(SCENE_METADATA, target);
  }

  getListenerMetadata(target: Function): ListenerMetadata[] | undefined {
    return this.reflector.get(LISTENERS_METADATA, target);
  }

  getSceneMetadata(target: Function): SceneMetadata | undefined {
    return this.reflector.get(SCENE_METADATA, target);
  }

  getWizardStepMetadata(target: Function): WizardStepMetadata | undefined {
    return this.reflector.get(WIZARD_STEP_METADATA, target);
  }
}
