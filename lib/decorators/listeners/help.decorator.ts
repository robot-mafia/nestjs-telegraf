import { createUpdateListenerDecorator } from '../../helpers';

/**
 * Handler for /help command.
 *
 * @see https://telegraf.js.org/#/?id=help
 */
export const Help = createUpdateListenerDecorator('help');
