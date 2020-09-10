import { Context as TelegrafContext } from 'telegraf';

export interface Context extends TelegrafContext {
  [key: string]: any;
}

/**
 * Removed type from Telegraf v3.38.0, added for backward compatibility.
 * TODO: remove on next major release
 */
export interface ContextMessageUpdate extends Context {}
