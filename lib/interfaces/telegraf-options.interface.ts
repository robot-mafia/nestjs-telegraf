import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Context } from 'telegraf';
import { TelegrafLaunchOption, TelegrafOption } from '../telegraf.types';

export interface TelegrafModuleOptions<C extends Context = Context> {
  token: string;
  options?: TelegrafOption;
  launchOptions?: TelegrafLaunchOption;
  middlewares?: Middleware<C>[];
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions(): TelegrafModuleOptions;
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TelegrafOptionsFactory>;
  useClass?: Type<TelegrafOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TelegrafModuleOptions> | TelegrafModuleOptions;
  inject?: any[];
}
