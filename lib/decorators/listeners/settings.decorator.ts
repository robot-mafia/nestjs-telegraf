import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Handler for /settings command.
 *
 * @see https://telegraf.js.org/#/?id=settings
 */
export const Settings = createUpdateDecorator('settings');
