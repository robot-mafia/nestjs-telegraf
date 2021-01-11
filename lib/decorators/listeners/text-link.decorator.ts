import { createListenerDecorator } from '../../utils';

/**
 * Registers middleware for handling messages with text_link entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-textlink
 */
export const TextLink = createListenerDecorator('textLink');
