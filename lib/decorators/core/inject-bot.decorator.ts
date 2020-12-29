import { Inject } from '@nestjs/common';
import { Telegraf } from 'telegraf';

export const InjectBot = (): ParameterDecorator => Inject(Telegraf);
