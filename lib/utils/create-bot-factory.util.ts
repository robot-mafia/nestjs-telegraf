import { Telegraf } from 'telegraf';
import { TelegrafModuleOptions } from '../interfaces';

export async function createBotFactory(
  options: TelegrafModuleOptions,
): Promise<Telegraf<never>> {
  const bot = new Telegraf<never>(options.token, options.options);

  bot.use(...(options.middlewares ?? []));
  await bot.launch(options.launchOptions);

  return bot;
}
