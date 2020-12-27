import { createUpdateDecorator } from '../../helpers/create-update-decorator.helper';

/**
 * Registers middleware for handling messages with url entity.
 *
 * @see https://telegraf.js.org/#/?id=telegraf-url
 */
export const Url = createUpdateDecorator('url');
