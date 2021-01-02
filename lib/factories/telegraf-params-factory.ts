import { TelegrafParamtype } from '../enums/telegraf-paramtype.enum';

export class TelegrafParamsFactory {
  exchangeKeyForValue<
    TContext extends Record<string, any> = any,
    TResult = any
  >(type: number, ctx: TContext, next: Function): TResult {
    switch (type as TelegrafParamtype) {
      case TelegrafParamtype.CONTEXT:
        return ctx as any;
      case TelegrafParamtype.NEXT:
        return next as any;
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
