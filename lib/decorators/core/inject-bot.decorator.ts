import { Inject } from '@nestjs/common';
import { getBotToken } from '../../utils';

export const InjectBot = (name?: string): ParameterDecorator =>
  Inject(getBotToken(name));
