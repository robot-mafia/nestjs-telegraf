import { createMissedListenerDecorator } from '../../utils';

/**
 * Registers middleware for handling messages with email entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-email
 */
export const Email = createMissedListenerDecorator<[string | string[]]>('email');
