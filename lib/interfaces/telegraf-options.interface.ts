import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Telegraf } from 'telegraf';

export interface TelegrafModuleOptions {
  token: string;
  botName?: string;
  options?: Telegraf.Options<any>;
  launchOptions?: Telegraf.LaunchOptions;
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<any>>;
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions(): Promise<TelegrafModuleOptions> | TelegrafModuleOptions;
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  botName?: string;
  useExisting?: Type<TelegrafOptionsFactory>;
  useClass?: Type<TelegrafOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TelegrafModuleOptions> | TelegrafModuleOptions;
  inject?: any[];
}
