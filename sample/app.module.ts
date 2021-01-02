import { Module } from '@nestjs/common';
import { TelegrafModule } from '../lib';
import { EchoService } from './echo.service';
import { AppUpdate } from './app.update';
import { HelloScene } from './scenes/hello.scene';
import { sessionMiddleware } from './common/middleware/session.middleware';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '1467731595:AAHCvH65H9VQYKF9jE-E8c2rXsQBVAYseg8', // Don't steal >:(
      middlewares: [sessionMiddleware],
    }),
  ],
  providers: [EchoService, AppUpdate],
})
export class AppModule {}
