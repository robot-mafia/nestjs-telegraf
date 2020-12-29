import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Registers middleware for handling messages with text_mention entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-textlink
 */
export const TextMention = createUpdateListenerDecorator('textMention');
