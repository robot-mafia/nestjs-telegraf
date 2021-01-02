import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Registers middleware for provided update type.
 *
 * @see https://telegraf.js.org/#/?id=on
 */
export const On = createUpdateListenerDecorator('on');
