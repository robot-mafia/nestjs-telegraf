import { ParamData } from '@nestjs/common';
import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { Context } from 'telegraf';
import { TelegrafParamtype } from '../enums/telegraf-paramtype.enum';

export class TelegrafParamsFactory implements ParamsFactory {
  exchangeKeyForValue(
    type: TelegrafParamtype,
    data: ParamData,
    args: unknown[],
  ): unknown {
    const ctx = args[0] as Context;
    const next = args[1] as Function;

    switch (type) {
      case TelegrafParamtype.CONTEXT:
        return ctx;
      case TelegrafParamtype.NEXT:
        return next;
      case TelegrafParamtype.SENDER:
        return ctx.from ? ctx.from[data as string] : ctx.from;
      case TelegrafParamtype.MESSAGE:
        return ctx.message ? ctx.message[data as string] : ctx.message;
      default:
        return null;
    }
  }
}
