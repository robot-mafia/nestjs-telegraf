import { SetMetadata } from '@nestjs/common';
import { GLOBAL_UPDATE_METADATA } from '../../telegraf.constants';

/**
 * `@GlobalUpdate` executed before scene handlers.
 */
export const GlobalUpdate = (): ClassDecorator => SetMetadata(GLOBAL_UPDATE_METADATA, true);
