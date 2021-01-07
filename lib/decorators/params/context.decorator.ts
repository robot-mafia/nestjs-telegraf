import { createTelegrafParamDecorator } from '../../utils/param-decorator.util';
import { TelegrafParamtype } from '../../enums/telegraf-paramtype.enum';

export const Context: () => ParameterDecorator = createTelegrafParamDecorator(
  TelegrafParamtype.CONTEXT,
);

export const Ctx = Context;
