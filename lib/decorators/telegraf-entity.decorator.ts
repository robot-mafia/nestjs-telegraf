import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

export type TelegrafEntityEntity =
  | string
  | string[]
  | RegExp
  | RegExp[]
  | Function;

export interface TelegrafEntityMetadata {
  entity: TelegrafEntityEntity;
}

/**
 * Entity handling.
 * @param entity Entity name
 *
 * https://telegraf.js.org/#/?id=entity
 */
export function TelegrafEntity(entity: TelegrafEntityEntity): MethodDecorator {
  return SetMetadata(DECORATORS.ENTITY, { entity });
}
