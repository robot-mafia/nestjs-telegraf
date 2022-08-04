import { createTelegrafParamDecorator } from '../../utils/param-decorator.util';
import { TelegrafParamtype } from '../../enums/telegraf-paramtype.enum';

export const Next: () => ParameterDecorator = createTelegrafParamDecorator(
  TelegrafParamtype.NEXT
);
