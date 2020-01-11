import { ModuleMetadata, Type } from '@nestjs/common/interfaces'

export interface TelegrafModuleOptions {
  token: string
  sitePublicUrl?: string
}

export interface TelegrafOptionsFactory {
  createOptions(): TelegrafModuleOptions
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<TelegrafOptionsFactory>
  inject?: any[]
}
