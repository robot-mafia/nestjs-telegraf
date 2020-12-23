import { On } from './core/on.decorator';

/**
 * New incoming message of any kind — text, photo, sticker, etc.
 * @constructor
 */
export const Message = (): MethodDecorator => On('message');

/**
 * New version of a message that is known to the bot and was edited
 * @constructor
 */
export const EditedMessage = (): MethodDecorator => On('edited_message');

/**
 * New incoming channel post of any kind — text, photo, sticker, etc.
 * @constructor
 */
export const ChannelPost = (): MethodDecorator => On('channel_post');

/**
 * New version of a channel post that is known to the bot and was edited
 * @constructor
 */
export const EditedChannelPost = (): MethodDecorator =>
  On('edited_channel_post');

/**
 * New incoming inline query
 * See this decorator in inline-query.decorator.ts
 * @constructor
 */
// export const InlineQuery = (): MethodDecorator => On('inline_query');

/**
 * The result of an inline query that was chosen by a user and sent to their chat partner.
 * @constructor
 */
export const ChosenInlineResult = (): MethodDecorator =>
  On('chosen_inline_result');

/**
 * New incoming callback query
 * @constructor
 */
export const CallbackQuery = (): MethodDecorator => On('callback_query');

/**
 * New incoming shipping query. Only for invoices with flexible price
 * @constructor
 */
export const ShippingQuery = (): MethodDecorator => On('shipping_query');

/**
 * New incoming pre-checkout query. Contains full information about checkout
 * @constructor
 */
export const PreCheckoutQuery = (): MethodDecorator => On('pre_checkout_query');

/**
 * New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot
 * @constructor
 */
export const Poll = (): MethodDecorator => On('poll');

/**
 * A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself.
 * @constructor
 */
export const PollAnswer = (): MethodDecorator => On('poll_answer');
