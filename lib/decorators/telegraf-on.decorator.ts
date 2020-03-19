import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { UpdateType, MessageSubTypes } from 'telegraf/typings/telegram-types';

/**
 * Registers middleware for provided update type.
 * @param updateTypes Update type
 *
 * https://telegraf.js.org/#/?id=on
 */
export function TelegrafOn(
  updateTypes: UpdateType | UpdateType[] | MessageSubTypes | MessageSubTypes[],
): MethodDecorator {
  return SetMetadata(DECORATORS.ON, { updateTypes: updateTypes });
}
