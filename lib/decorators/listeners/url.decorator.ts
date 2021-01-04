import { createMissedListenerDecorator } from '../../utils';

/**
 * Registers middleware for handling messages with url entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-url
 */
export const Url = createMissedListenerDecorator<[string | string[]]>('url');
