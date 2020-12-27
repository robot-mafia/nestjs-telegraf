import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Handler for /start command.
 *
 * @see https://telegraf.js.org/#/?id=start
 */
export const Start = createUpdateDecorator('start');
