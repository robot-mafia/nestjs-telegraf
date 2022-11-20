import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, PollingOptions, BotConfig } from 'grammy';

export interface TelegrafModuleOptions {
  token: string;
  config?: BotConfig<any>;
  pollingOptions?: PollingOptions | false;
  botName?: string;
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<any>>;
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions():
    | Promise<TelegrafModuleOptions>
    | TelegrafModuleOptions;
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
