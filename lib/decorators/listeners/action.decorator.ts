import { createListenerDecorator } from '../../utils';

/**
 * Registers middleware for handling callback_data actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=action
 */
export const Action = createListenerDecorator('action');
