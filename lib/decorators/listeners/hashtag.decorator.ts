import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_METHOD_METADATA,
} from '../../telegraf.constants';
import { ListenerMethod } from '../../enums';
import { TelegrafHashtag } from '../../telegraf.types';

/**
 * Hashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=hashtag
 */
export const Hashtag = (hashtag: TelegrafHashtag): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_METHOD_METADATA, ListenerMethod.Hashtag),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, [hashtag]),
  );
};
