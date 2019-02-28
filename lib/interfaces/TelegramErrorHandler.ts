import { ContextMessageUpdate } from 'telegraf'

export interface TelegramErrorHandler<E = any> {
  catch(ctx: ContextMessageUpdate, error: E): Promise<void>
}
