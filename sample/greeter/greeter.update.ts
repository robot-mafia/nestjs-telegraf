import { Injectable } from '@nestjs/common';
import { Hears } from '../../lib';
import { Context } from '../interfaces/context.interface';

@Injectable()
export class GreeterUpdate {
  @Hears(['hi', 'hello', 'hey', 'qq'])
  async onGreetings(ctx: Context): Promise<void> {
    const { first_name } = ctx.from;
    await ctx.reply(`Hey ${first_name}`);
  }
}
