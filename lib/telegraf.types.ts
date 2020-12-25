import { Composer, Telegraf } from 'telegraf';
import { Context } from './interfaces';

export type TelegrafActionTriggers = Parameters<Composer<Context>['action']>[0];
export type TelegrafHearsTriggers = Parameters<Composer<Context>['hears']>[0];
export type TelegrafInlineQueryTriggers = Parameters<
  Composer<Context>['inlineQuery']
>[0];
export type TelegrafEmail = Parameters<Composer<Context>['email']>[0];
export type TelegrafUrl = Parameters<Composer<Context>['url']>[0];
export type TelegrafTextLink = Parameters<Composer<Context>['textLink']>[0];
export type TelegrafTextMention = Parameters<
  Composer<Context>['textMention']
>[0];
export type TelegrafCashtag = Parameters<Composer<Context>['cashtag']>[0];
export type TelegrafHashtag = Parameters<Composer<Context>['hashtag']>[0];
export type TelegrafCommand = Parameters<Composer<Context>['command']>[0];
export type TelegrafMention = Parameters<Composer<Context>['mention']>[0];
export type TelegrafPhone = Parameters<Composer<Context>['phone']>[0];
export type TelegrafUpdateType = Parameters<Composer<Context>['on']>[0];
export type TelegrafOption = ConstructorParameters<typeof Telegraf>[1];
export type TelegrafLaunchOption = Parameters<Telegraf['launch']>[0];
