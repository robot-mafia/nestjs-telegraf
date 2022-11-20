import { Inject } from '@nestjs/common';
import { Bot } from 'grammy';

import { getAllBotsToken } from '../../utils/get-all-bots-token.util';

export type AllBotsMap = Map<string, Bot<any>>;

export const InjectAllBots = (): ParameterDecorator =>
  Inject(getAllBotsToken());
