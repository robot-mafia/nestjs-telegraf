import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import { UpdateType, MessageSubTypes } from 'telegraf/typings/telegram-types';

export type TelegrafOnUpdateTypes =
  | UpdateType
  | UpdateType[]
  | MessageSubTypes
  | MessageSubTypes[];

export interface OnOptions {
  updateTypes: TelegrafOnUpdateTypes;
}

/**
 * Registers middleware for provided update type.
 *
 * @see https://telegraf.js.org/#/?id=on
 */
export const On = (updateTypes: TelegrafOnUpdateTypes): MethodDecorator => {
  return SetMetadata(DECORATORS.ON, { updateTypes: updateTypes });
};
