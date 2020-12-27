import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Registers middleware for handling messages with email entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-email
 */
export const Email = createUpdateDecorator('email');
