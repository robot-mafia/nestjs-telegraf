import { DEFAULT_BOT_NAME } from '../telegraf.constants';

export function getBotToken(name?: string): string {
  return name && name !== DEFAULT_BOT_NAME ? `${name}Bot` : DEFAULT_BOT_NAME;
}
