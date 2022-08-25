import { SetMetadata } from '@nestjs/common';
import { COMPOSER_METADATA } from '../../telegraf.constants';

/**
 * `@Composer` executed before scene handlers.
 */
export const Composer = (): ClassDecorator => SetMetadata(COMPOSER_METADATA, true);
