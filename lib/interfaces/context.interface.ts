import { TelegrafContext } from 'telegraf/typings/context';

export interface Context extends TelegrafContext {
  [key: string]: any;
}
