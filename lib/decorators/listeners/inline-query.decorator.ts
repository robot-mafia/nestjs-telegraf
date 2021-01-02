import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const InlineQuery = createUpdateListenerDecorator('inlineQuery');
