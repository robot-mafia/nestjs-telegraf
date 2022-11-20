import { Inject } from '@nestjs/common';
import { getBotToken } from '../../utils';

export const InjectBot = (botName?: string): ParameterDecorator =>
  Inject(getBotToken(botName));
