import { Hears, Start, Update } from '../../../../lib';
import { Context } from '../interfaces/context.interface';

@Update()
export class GreeterUpdate {
  @Start()
  async onStart(ctx: Context): Promise<void> {
    await ctx.reply('Say hello to me');
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  async onGreetings(ctx: Context): Promise<void> {
    const { first_name } = ctx.from;
    await ctx.reply(`Hey ${first_name}`);
  }
}
