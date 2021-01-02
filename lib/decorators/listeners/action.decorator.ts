import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Registers middleware for handling callback_data actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=action
 */
export const Action = createUpdateListenerDecorator('action');
