import { ContextMessageUpdate } from 'telegraf'

export interface ContextTransformer<T = any> {
  transform: (ctx: ContextMessageUpdate) => Promise<T>
}
