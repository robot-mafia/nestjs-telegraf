import { Inject } from '@nestjs/common';
import { TelegrafProvider } from '../../telegraf.provider';

export const InjectBot = (): ParameterDecorator => Inject(TelegrafProvider);
