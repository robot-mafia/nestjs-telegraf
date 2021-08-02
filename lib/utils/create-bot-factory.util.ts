import { Telegraf } from 'telegraf';
import { TelegrafModuleOptions } from '../interfaces';

export async function createBotFactory(
  options: TelegrafModuleOptions,
): Promise<Telegraf<any>> {
  const bot = new Telegraf<any>(options.token, options.options);

  bot.use(...(options.sessionMiddlewares ?? []));

  if (options.launchOptions !== false) {
    await bot.launch(options.launchOptions);
  }

  return bot;
}
