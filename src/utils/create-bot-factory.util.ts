import { Bot } from 'grammy';
import { TelegrafModuleOptions } from '../interfaces';

export async function createBotFactory(
  options: TelegrafModuleOptions,
): Promise<Bot> {
  const bot = new Bot(options.token, options.config);

  bot.use(...(options.middlewares ?? []));

  if (options.pollingOptions !== false) {
    bot.start(options.pollingOptions);
  }

  return bot;
}
