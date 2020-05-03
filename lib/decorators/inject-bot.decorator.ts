import { Inject } from '@nestjs/common';
import { TELEGRAF_PROVIDER } from '../telegraf.constants';

export const InjectBot = (): ParameterDecorator => Inject(TELEGRAF_PROVIDER);
