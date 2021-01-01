import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import {
  TelegrafOptions,
  LaunchPollingOptions,
  LaunchWebhookOptions,
} from 'telegraf/typings/telegraf';
import { Middleware } from 'telegraf/typings/composer';

export interface TelegrafModuleOptions {
  token: string;
  options?: TelegrafOptions;
  launchOptions?: {
    polling?: LaunchPollingOptions;
    webhook?: LaunchWebhookOptions;
  };
  botName?: string;
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<any>>;
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions(): TelegrafModuleOptions;
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
