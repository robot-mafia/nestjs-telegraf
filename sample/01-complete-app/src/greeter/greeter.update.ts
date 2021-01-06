import { Command, Context as Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { User } from 'telegraf/typings/telegram-types';
import { Context } from '../interfaces/context.interface';
import { HELLO_SCENE_ID } from '../app.constants';
import { From } from '../common/decorators/from.decorator';

@Update()
export class GreeterUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Say hello to me');
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(@From() { first_name: firstName }: User): string {
    return `Hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }
}
