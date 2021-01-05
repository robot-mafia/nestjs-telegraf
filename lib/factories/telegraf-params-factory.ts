import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { Context } from 'telegraf';
import { TelegrafParamtype } from '../enums/telegraf-paramtype.enum';

export class TelegrafParamsFactory implements ParamsFactory {
  exchangeKeyForValue(
    type: TelegrafParamtype,
    ctx: Context,
    next: Function,
  ): unknown {
    switch (type) {
      case TelegrafParamtype.CONTEXT:
        return ctx;
      case TelegrafParamtype.NEXT:
        return next;
      case TelegrafParamtype.SENDER:
        return ctx.from;
      case TelegrafParamtype.MESSAGE:
        return ctx.message;
      case TelegrafParamtype.MESSAGE_TEXT:
        return ctx.message.text;
      default:
        return null;
    }
  }
}
