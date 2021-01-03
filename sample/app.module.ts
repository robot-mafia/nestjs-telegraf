import { Module } from '@nestjs/common';
import { TelegrafModule } from '../lib';
import { EchoService } from './echo.service';
import { AppUpdate } from './app.update';
import { HelloScene } from './scenes/hello.scene';
import { sessionMiddleware } from './middleware/session.middleware';
import { SUPPORT_BOT_NAME } from './app.constants';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '1417509321:AAEHz8a2QSAP4cTHh4Z6-ulePysFaUx4SjY', // Don't steal >:(
      middlewares: [sessionMiddleware],
    }),
    TelegrafModule.forRoot({
      name: SUPPORT_BOT_NAME,
      token: '1435922623:AAHmBmnyqroHxDbuK6OKsLV8Y_oB_Lf9E6E', // Don't steal >:(
      middlewares: [sessionMiddleware],
    }),
  ],
  providers: [EchoService, AppUpdate, HelloScene],
})
export class AppModule {}
