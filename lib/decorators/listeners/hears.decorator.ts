import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Registers middleware for handling text messages.
 *
 * @see https://telegraf.js.org/#/?id=hears
 */
export const Hears = createUpdateListenerDecorator('hears');
