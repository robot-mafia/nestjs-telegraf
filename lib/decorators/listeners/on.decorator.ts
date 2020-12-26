import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_METHOD_METADATA,
} from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';
import { TelegrafUpdateType } from '../../telegraf.types';

/**
 * Registers middleware for provided update type.
 *
 * @see https://telegraf.js.org/#/?id=on
 */
export const On = (updateTypes: TelegrafUpdateType): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.On),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, [updateTypes]),
  );
};
