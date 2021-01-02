import { assignMetadata, PipeTransform, Type } from '@nestjs/common';
import { TelegrafParamtype } from '../enums/telegraf-paramtype.enum';
import { LISTENER_ARGS_METADATA } from '../telegraf.constants';

export function createTelegrafParamDecorator(
  paramtype: TelegrafParamtype,
): (...pipes: (Type<PipeTransform> | PipeTransform)[]) => ParameterDecorator {
  return (...pipes: (Type<PipeTransform> | PipeTransform)[]) => (
    target,
    key,
    index,
  ) => {
    const args =
      Reflect.getMetadata(LISTENER_ARGS_METADATA, target.constructor, key) ||
      {};
    Reflect.defineMetadata(
      LISTENER_ARGS_METADATA,
      assignMetadata(args, paramtype, index, undefined, ...pipes),
      target.constructor,
      key,
    );
  };
}

export const createPipesTelegrafParamDecorator = (
  paramtype: TelegrafParamtype,
) => (
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator => (target, key, index) => {
  const args =
    Reflect.getMetadata(LISTENER_ARGS_METADATA, target.constructor, key) || {};

  Reflect.defineMetadata(
    LISTENER_ARGS_METADATA,
    assignMetadata(args, paramtype, index, undefined, ...pipes),
    target.constructor,
    key,
  );
};
