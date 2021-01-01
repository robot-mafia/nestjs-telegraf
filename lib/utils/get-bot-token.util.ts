import { DEFAULT_BOT_NAME } from '../telegraf.constants';

export function getBotToken(name?: string) {
  return name && name !== DEFAULT_BOT_NAME
    ? `${name}_BOT_NAME`
    : DEFAULT_BOT_NAME;
}
