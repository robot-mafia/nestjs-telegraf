import { createUpdateListenerDecorator } from '../../utils';

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = createUpdateListenerDecorator('start');
