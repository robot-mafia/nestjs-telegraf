import { Type } from '@nestjs/common/interfaces/type.interface';
import { Composer, Telegraf } from 'telegraf';
import { Context } from './interfaces';

type CtxComposer = Composer<Context>;

type ComposerMethodFirstArg<T extends keyof CtxComposer> = Parameters<
  CtxComposer[T]
>[0];

export type TelegrafActionTriggers = ComposerMethodFirstArg<'action'>;
export type TelegrafHearsTriggers = ComposerMethodFirstArg<'hears'>;
export type TelegrafInlineQueryTriggers = ComposerMethodFirstArg<'inlineQuery'>;
export type TelegrafEmail = ComposerMethodFirstArg<'email'>;
export type TelegrafUrl = ComposerMethodFirstArg<'url'>;
export type TelegrafTextLink = ComposerMethodFirstArg<'textLink'>;
export type TelegrafTextMention = ComposerMethodFirstArg<'textMention'>;
export type TelegrafCashtag = ComposerMethodFirstArg<'cashtag'>;
export type TelegrafHashtag = ComposerMethodFirstArg<'hashtag'>;
export type TelegrafCommand = ComposerMethodFirstArg<'command'>;
export type TelegrafMention = ComposerMethodFirstArg<'mention'>;
export type TelegrafPhone = ComposerMethodFirstArg<'phone'>;
export type TelegrafUpdateType = ComposerMethodFirstArg<'on'>;

export type TelegrafOption = ConstructorParameters<Type<Telegraf<Context>>>[1];
export type TelegrafLaunchOption = Parameters<Telegraf['launch']>[0];
