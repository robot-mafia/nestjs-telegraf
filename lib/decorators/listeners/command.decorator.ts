import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  UPDATE_LISTENER_OPTIONS_METADATA,
  UPDATE_LISTENER_TYPE_METADATA,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafCommand } from '../../telegraf.types';

export interface CommandOptions {
  command: TelegrafCommand;
}

/**
 * Command handling.
 *
 * @see https://telegraf.js.org/#/?id=command
 */
export const Command = (command: TelegrafCommand): MethodDecorator => {
  return applyDecorators(
    SetMetadata(UPDATE_LISTENER_TYPE_METADATA, ListenerType.Command),
    SetMetadata(UPDATE_LISTENER_OPTIONS_METADATA, {
      command: command,
    } as CommandOptions),
  );
};
