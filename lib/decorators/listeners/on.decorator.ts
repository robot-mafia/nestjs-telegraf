import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Registers middleware for provided update type.
 *
 * @see https://telegraf.js.org/#/?id=on
 */
export const On = createUpdateDecorator('on');
