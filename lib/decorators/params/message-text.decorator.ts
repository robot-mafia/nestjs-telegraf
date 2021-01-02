import { PipeTransform, Type } from '@nestjs/common';
import { createPipesTelegrafParamDecorator } from '../../utils/param-decorator.util';
import { TelegrafParamtype } from '../../enums/telegraf-paramtype.enum';

export function MessageText(): ParameterDecorator;
export function MessageText(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator;
export function MessageText(
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesTelegrafParamDecorator(TelegrafParamtype.MESSAGE_TEXT)(
    ...pipes,
  );
}
