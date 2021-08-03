import { SceneOptions } from 'telegraf/typings/scenes/base';

export interface SceneMetadata {
  sceneId: string;
  type: 'base' | 'wizard';
  options?: SceneOptions<any>;
}

export interface WizardStepMetadata {
  step: number;
}
