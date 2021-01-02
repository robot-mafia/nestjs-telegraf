import { createUpdateListenerDecorator } from '../../utils';

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const InlineQuery = createUpdateListenerDecorator('inlineQuery');
