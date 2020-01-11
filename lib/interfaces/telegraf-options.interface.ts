import { ModuleMetadata, Type } from '@nestjs/common/interfaces'

export interface TelegrafModuleOptions {
  token: string
  sitePublicUrl?: string
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
