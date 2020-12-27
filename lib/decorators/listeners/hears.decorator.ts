import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Registers middleware for handling text messages.
 *
 * @see https://telegraf.js.org/#/?id=hears
 */
export const Hears = createUpdateDecorator('hears');
