import { TelegramModuleOptions } from './TelegramModuleOptions'

export interface TelegramModuleOptionsFactory {
  createOptions(): TelegramModuleOptions
}
