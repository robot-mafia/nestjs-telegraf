export * as Composer from 'telegraf/composer';
export * as Markup from 'telegraf/markup';
export * as BaseScene from 'telegraf/scenes/base';
export * as session from 'telegraf/session';
export * as Stage from 'telegraf/stage';
export * as WizardScene from 'telegraf/scenes/wizard';
export * as Extra from 'telegraf/extra';

export * from './decorators';
export * from './interfaces';
export * from './utils';
export * from './telegraf.module';
export { Telegraf } from 'telegraf';

/**
 * Backward compatibility with versions < 1.4.0,
 * after removing TelegrafProvider service
 * TODO: remove that on next major release
 */
export { Telegraf as TelegrafProvider } from 'telegraf';
