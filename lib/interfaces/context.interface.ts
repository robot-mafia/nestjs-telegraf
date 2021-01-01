import { TelegrafContext } from 'telegraf/typings/context';

export interface Context extends TelegrafContext {
  [key: string]: any; // TBD
}

/**
 * Removed type from Telegraf v3.38.0, added for backward compatibility.
 * TODO: remove on next major release
 */
export interface ContextMessageUpdate extends Context {}
