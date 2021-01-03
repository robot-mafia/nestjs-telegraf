import { createMissedListenerDecorator } from '../../utils';

/**
 * Cashtag handling.
 *
 * @see https://telegraf.js.org/#/?id=cashtag
 */
export const Cashtag = createMissedListenerDecorator<[string | string[]]>('cashtag');
