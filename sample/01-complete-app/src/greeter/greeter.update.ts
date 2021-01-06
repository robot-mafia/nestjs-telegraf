import { Command, Hears, Start, Update } from 'nestjs-telegraf';
import { Context } from '../interfaces/context.interface';
import { HELLO_SCENE_ID } from '../app.constants';

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

  @Command('scene')
  async onSceneCommand(ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }
}
