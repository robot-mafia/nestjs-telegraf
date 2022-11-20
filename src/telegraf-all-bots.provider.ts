import { Provider } from '@nestjs/common';
import { Bot } from 'grammy';
import { TELEGRAF_ALL_BOTS } from './telegraf.constants';

export const allBotsMap = new Map<string, Bot<any>>();

export const telegrafAllBotsProvider: Provider = {
  provide: TELEGRAF_ALL_BOTS,
  useValue: allBotsMap,
};
