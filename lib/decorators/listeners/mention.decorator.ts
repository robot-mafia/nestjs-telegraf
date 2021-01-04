import { createMissedListenerDecorator } from '../../utils';

/**
 * Mention handling.
 *
 * @see https://telegraf.js.org/#/?id=mention
 */
export const Mention = createMissedListenerDecorator<[string | string[]]>(
  'mention',
);
