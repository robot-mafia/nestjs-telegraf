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
export const OnMessage = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'message',
  });
};

/**
 * New version of a message that is known to the bot and was edited
 * @constructor
 */
export const OnEditedMessage = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'edited_message',
  });
};

/**
 * New incoming channel post of any kind — text, photo, sticker, etc.
 * @constructor
 */
export const OnChannelPost = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'channel_post',
  });
};

/**
 * New version of a channel post that is known to the bot and was edited
 * @constructor
 */
export const OnEditedChannelPost = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'edited_channel_post',
  });
};

/**
 * New incoming inline query
 * @constructor
 */
export const OnInlineQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'inline_query',
  });
};

/**
 * The result of an inline query that was chosen by a user and sent to their chat partner.
 * @constructor
 */
export const OnChosenInlineResult = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'chosen_inline_result',
  });
};

/**
 * New incoming callback query
 * @constructor
 */
export const OnCallbackQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'callback_query',
  });
};

/**
 * New incoming shipping query. Only for invoices with flexible price
 * @constructor
 */
export const OnShippingQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'shipping_query',
  });
};

/**
 * New incoming pre-checkout query. Contains full information about checkout
 * @constructor
 */
export const OnPreCheckoutQuery = (): MethodDecorator => {
  return SetMetadata(DECORATORS.UPDATE_HOOK, {
    updateType: 'pre_checkout_query',
  });
};

// Two more decorators are missing here. For 'poll' and 'poll_answer' update types.
