import { SetMetadata } from '@nestjs/common';
import { GLOBAL_UPDATE_METADATA } from '../../telegraf.constants';

/**
 * `@GlobalUpdate` decorator, it's like `@Update` decorator,
 * but processed before the scenes
 */
export const GlobalUpdate = (): ClassDecorator =>
  SetMetadata(GLOBAL_UPDATE_METADATA, true);
