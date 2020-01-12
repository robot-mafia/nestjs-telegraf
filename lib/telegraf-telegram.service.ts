import { Injectable, Inject } from '@nestjs/common';
const Telegram = require('telegraf/telegram');
import { Telegram as TelegramClient } from 'telegraf';

import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';
import { TelegrafModuleOptions } from './interfaces';

@Injectable()
export class TelegrafTelegramService extends TelegramClient {
  constructor(@Inject(TELEGRAF_MODULE_OPTIONS) options: TelegrafModuleOptions) {
    super(options.token, {});
  }
}
