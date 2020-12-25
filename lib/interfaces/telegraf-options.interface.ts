import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { TelegrafLaunchOption, TelegrafOption } from '../telegraf.types';

export interface TelegrafModuleOptions {
  token: string;
  options?: TelegrafOption;
  launchOptions?: TelegrafLaunchOption;
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
