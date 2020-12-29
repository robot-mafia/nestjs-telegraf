import { SetMetadata } from '@nestjs/common';
import { SCENE_LISTENER_METADATA } from '../../telegraf.constants';
import { SceneEventType } from '../../enums/scene-event-type.enum';

export const SceneLeave = (): MethodDecorator =>
  SetMetadata(SCENE_LISTENER_METADATA, SceneEventType.Leave);
