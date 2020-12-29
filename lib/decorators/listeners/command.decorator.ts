import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Command handling.
 *
 * @see https://telegraf.js.org/#/?id=command
 */
export const Command = createUpdateListenerDecorator('command');
