import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Registers a middleware.
 *
 * @see https://telegraf.js.org/#/?id=use
 */
export const Use = createUpdateDecorator('use');
