import { SetMetadata } from '@nestjs/common';
import { SCENE_METADATA } from '../../telegraf.constants';

/**
 * TODO
 */
export const Scene = (id: string): ClassDecorator =>
  SetMetadata(SCENE_METADATA, id);
