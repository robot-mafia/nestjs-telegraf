import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  LISTENER_OPTIONS_METADATA,
  LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { TelegrafCashtag } from '../../telegraf.types';
import { ListenerType } from '../../enums/listener-type.enum';

export interface CashtagOptions {
  cashtag: TelegrafCashtag;
}

/**
 * Cashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=cashtag
 */
export const Cashtag = (cashtag: TelegrafCashtag): MethodDecorator => {
  return applyDecorators(
    SetMetadata(LISTENER_TYPE_METADATA, ListenerType.Cashtag),
    SetMetadata(LISTENER_OPTIONS_METADATA, {
      cashtag,
    } as CashtagOptions),
  );
};
