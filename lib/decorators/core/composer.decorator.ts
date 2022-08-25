import { SetMetadata } from '@nestjs/common';
import { COMPOSER_METADATA } from '../../telegraf.constants';

/**
 * `@Composer` like Update decorator, executed before scene handlers.
 */
export const Composer = (): ClassDecorator =>
  SetMetadata(COMPOSER_METADATA, true);
