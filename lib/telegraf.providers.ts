import { Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';
import { TelegrafModuleOptions } from './interfaces';

export const TelegrafProvider = {
  provide: Telegraf,
  inject: [TELEGRAF_MODULE_OPTIONS],
  useFactory: (options: TelegrafModuleOptions) => {
    const telegraf = new Telegraf(options.token, options.options);
    return telegraf;
  },
};

export function createProviders(options: TelegrafModuleOptions): Provider[] {
  return [
    {
      provide: TELEGRAF_MODULE_OPTIONS,
      useValue: options,
    },
  ];
}
