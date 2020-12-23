import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  TELEGRAF_LISTENER_OPTIONS,
  TELEGRAF_LISTENER_TYPE,
} from '../../telegraf.constants';
import { ListenerType } from '../../enums/listener-type.enum';
import { TelegrafCommand } from '../../telegraf.types';

export interface CommandOptions {
  commands: TelegrafCommand;
}

/**
 * Command handling.
 *
 * @see https://telegraf.js.org/#/?id=command
 */
export const Command = (commands: TelegrafCommand): MethodDecorator => {
  return applyDecorators(
    SetMetadata(TELEGRAF_LISTENER_TYPE, ListenerType.Command),
    SetMetadata(TELEGRAF_LISTENER_OPTIONS, {
      commands,
    } as CommandOptions),
  );
};
