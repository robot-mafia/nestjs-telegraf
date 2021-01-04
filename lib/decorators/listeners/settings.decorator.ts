import { createMissedListenerDecorator } from '../../utils';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = createMissedListenerDecorator<[]>('settings');
