import { createMissedListenerDecorator } from '../../utils';

/**
 * Hashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=hashtag
 */
export const Hashtag = createMissedListenerDecorator<[string | string[]]>('hashtag');
