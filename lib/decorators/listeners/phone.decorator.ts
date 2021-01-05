import { createMissedListenerDecorator } from '../../utils';

/**
 * Phone number handling.
 *
 * @see https://telegraf.js.org/#/?id=phone
 */
export const Phone = createMissedListenerDecorator<[string | string[]]>('phone');
