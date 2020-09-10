import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';
import * as tt from 'telegraf/typings/telegram-types';

export interface UpdateHookOptions {
  updateType:
    | tt.UpdateType
    | tt.UpdateType[]
    | tt.MessageSubTypes
    | tt.MessageSubTypes[];
}

/**
 * New incoming message of any kind — text, photo, sticker, etc.
 * @constructor
 */
export const Message = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'message',
  });
};

/**
 * New version of a message that is known to the bot and was edited
 * @constructor
 */
export const EditedMessage = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'edited_message',
  });
};

/**
 * New incoming channel post of any kind — text, photo, sticker, etc.
 * @constructor
 */
export const ChannelPost = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'channel_post',
  });
};

/**
 * New version of a channel post that is known to the bot and was edited
 * @constructor
 */
export const EditedChannelPost = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'edited_channel_post',
  });
};

/**
 * New incoming inline query
 * See this decorator in inline-query.decorator.ts
 * @constructor
 */
// export const InlineQuery = (): MethodDecorator => {
//   return SetMetadata(DECORATORS.UPDATE_HOOK, {
//     updateType: 'inline_query',
//   });
// };

/**
 * The result of an inline query that was chosen by a user and sent to their chat partner.
 * @constructor
 */
export const ChosenInlineResult = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'chosen_inline_result',
  });
};

/**
 * New incoming callback query
 * @constructor
 */
export const CallbackQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'callback_query',
  });
};

/**
 * New incoming shipping query. Only for invoices with flexible price
 * @constructor
 */
export const ShippingQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'shipping_query',
  });
};

/**
 * New incoming pre-checkout query. Contains full information about checkout
 * @constructor
 */
export const PreCheckoutQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'pre_checkout_query',
  });
};

// Two more decorators are missing here. For 'poll' and 'poll_answer' update types.
