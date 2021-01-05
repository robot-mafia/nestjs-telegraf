import { createMissedListenerDecorator } from '../../utils';
import { HearsTriggers } from 'telegraf/typings/composer';

/**
 * Registers middleware for handling inline_query actions with regular expressions.
 *
 * @see https://telegraf.js.org/#/?id=inlinequery
 */
export const InlineQuery = createMissedListenerDecorator<[HearsTriggers<unknown>]>('inlineQuery');
