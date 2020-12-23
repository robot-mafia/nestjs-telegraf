import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafUpdateType } from '../../telegraf.types';

export interface OnOptions {
  updateTypes: TelegrafUpdateType;
}

/**
 * Registers middleware for provided update type.
 *
 * @see https://telegraf.js.org/#/?id=on
 */
export const On = (updateTypes: TelegrafUpdateType): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.On),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      updateTypes,
    } as OnOptions),
  );
};
