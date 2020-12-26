import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
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
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.On),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      updateTypes,
    } as OnOptions),
  );
};
