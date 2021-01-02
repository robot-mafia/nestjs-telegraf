import { PipeTransform, Type } from '@nestjs/common';
import { createTelegrafPipesParamDecorator } from '../../utils/param-decorator.util';
import { TelegrafParamtype } from '../../enums/telegraf-paramtype.enum';

export function MessageText(...pipes: (Type<PipeTransform> | PipeTransform)[]) {
  return createTelegrafPipesParamDecorator(TelegrafParamtype.MESSAGE_TEXT)(
    undefined,
    ...pipes,
  );
}
