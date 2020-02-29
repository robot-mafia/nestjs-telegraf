import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import { TelegrafOptions } from 'telegraf'

export interface TelegrafModuleOptions {
  token: string
  sitePublicUrl?: string
  telegrafOptions?: TelegrafOptions
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions(): TelegrafModuleOptions
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TelegrafOptionsFactory>
  useClass?: Type<TelegrafOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<TelegrafModuleOptions> | TelegrafModuleOptions
  inject?: any[]
}
