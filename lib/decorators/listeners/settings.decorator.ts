import { createUpdateListenerDecorator } from '../../utils';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = createUpdateListenerDecorator('settings');
