import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Context } from 'telegraf';
import {
  TelegrafOptions,
  LaunchPollingOptions,
  LaunchWebhookOptions,
} from 'telegraf/typings/telegraf';

export interface TelegrafModuleOptions<C extends Context = Context> {
  token: string;
  name?: string;
  options?: TelegrafOptions;
  launchOptions?: {
    polling?: LaunchPollingOptions;
    webhook?: LaunchWebhookOptions;
  };
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<C>>;
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions(): TelegrafModuleOptions;
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<TelegrafOptionsFactory>;
  useClass?: Type<TelegrafOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TelegrafModuleOptions> | TelegrafModuleOptions;
  inject?: any[];
}
