import { Context, Composer } from 'telegraf';

export type TelegrafActionTriggers = Parameters<Composer<Context>['action']>[0];
export type TelegrafHearsTriggers = Parameters<Composer<Context>['hears']>[0];
export type TelegrafInlineQueryTriggers = Parameters<
  Composer<Context>['inlineQuery']
>[0];
export type TelegrafCashtag = Parameters<Composer<Context>['cashtag']>[0];
export type TelegrafHashtag = Parameters<Composer<Context>['hashtag']>[0];
export type TelegrafCommand = Parameters<Composer<Context>['command']>[0];
export type TelegrafMention = Parameters<Composer<Context>['mention']>[0];
export type TelegrafPhone = Parameters<Composer<Context>['phone']>[0];
export type TelegrafUpdateType = Parameters<Composer<Context>['on']>[0];
