import { createUpdateListenerDecorator } from '../../utils';

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 */
export const Use = createUpdateListenerDecorator('use');
