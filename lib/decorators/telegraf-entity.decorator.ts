import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type Entity = string | string[] | RegExp | RegExp[] | Function;

/**
 * Entity handling.
 * @param entity Entity name
 *
 * https://telegraf.js.org/#/?id=entity
 */
export function TelegrafEntity(entity: Entity): MethodDecorator {
  return SetMetadata(DECORATORS.ENTITY, { entity });
}
