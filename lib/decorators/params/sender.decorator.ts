import { PipeTransform, Type } from '@nestjs/common';
import { createTelegrafPipesParamDecorator } from '../../utils/param-decorator.util';
import { TelegrafParamtype } from '../../enums/telegraf-paramtype.enum';

export function Sender(): ParameterDecorator;
export function Sender(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Sender(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function Sender(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return createTelegrafPipesParamDecorator(TelegrafParamtype.SENDER)(
    property,
    ...pipes,
  );
}
