import { Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TELEGRAF_ALL_BOTS } from './telegraf.constants';

export const allBotsMap = new Map<string, Telegraf<any>>();

setTimeout(() => console.log(allBotsMap), 2000);

export const telegrafAllBotsProvider: Provider = {
  provide: TELEGRAF_ALL_BOTS,
  useValue: allBotsMap,
};
