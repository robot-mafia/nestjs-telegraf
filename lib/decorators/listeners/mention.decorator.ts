import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Mention handling.
 *
 * @see https://telegraf.js.org/#/?id=mention
 */
export const Mention = createUpdateListenerDecorator('mention');
