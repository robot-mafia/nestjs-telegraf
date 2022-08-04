import { PipeTransform, Type } from '@nestjs/common';
import { createTelegrafPipesParamDecorator } from '../../utils/param-decorator.util';
import { TelegrafParamtype } from '../../enums/telegraf-paramtype.enum';

export function Message(): ParameterDecorator;
export function Message(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Message(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Message(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return createTelegrafPipesParamDecorator(TelegrafParamtype.MESSAGE)(
    property,
    ...pipes
  );
}
