import { createUpdateListenerDecorator } from '../../utils';

/**
 * Mention handling.
 *
 * @see https://telegraf.js.org/#/?id=mention
 */
export const Mention = createUpdateListenerDecorator('mention');
