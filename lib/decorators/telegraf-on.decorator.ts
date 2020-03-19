import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { UpdateType, MessageSubTypes } from 'telegraf/typings/telegram-types';

export type TelegrafOnUpdateTypes =
  | UpdateType
  | UpdateType[]
  | MessageSubTypes
  | MessageSubTypes[];

export interface TelegrafOnMetadata {
  updateTypes: TelegrafOnUpdateTypes;
}

/**
 * Registers middleware for provided update type.
 * @param updateTypes Update type
 *
 * https://telegraf.js.org/#/?id=on
 */
export function TelegrafOn(
  updateTypes: TelegrafOnUpdateTypes,
): MethodDecorator {
  return SetMetadata(DECORATORS.ON, { updateTypes: updateTypes });
}
