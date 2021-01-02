import { HELLO_SCENE_ID } from '../app.constants';
import { Context } from '../interfaces/context.interface';
import { Scene, SceneEnter, SceneLeave, Command } from '../../lib';

@Scene(HELLO_SCENE_ID)
export class HelloScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    console.log('Enter to scene');
    await ctx.reply('Welcome on scene ✋');
  }

  @SceneLeave()
  async onSceneLeave(ctx: Context): Promise<void> {
    console.log('Leave from scene');
    await ctx.reply('Bye Bye 👋');
  }

  @Command('hello')
  async onHelloCommand(ctx: Context): Promise<void> {
    console.log('Use say hello');
    await ctx.reply('Hi');
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }
}
