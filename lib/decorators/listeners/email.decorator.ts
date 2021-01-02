import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Registers middleware for handling messages with email entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-email
 */
export const Email = createUpdateListenerDecorator('email');
