import { createUpdateListenerDecorator } from '../../utils';

/**
 * Command handling.
 *
 * @see https://telegraf.js.org/#/?id=command
 */
export const Command = createUpdateListenerDecorator('command');
