import { Module } from '@nestjs/common';
import { TelegrafModule } from '../../lib';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { GreeterBotName } from './app.constants';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '1417509321:AAEHz8a2QSAP4cTHh4Z6-ulePysFaUx4SjY', // Don't steal >:(
      middlewares: [sessionMiddleware],
      include: [EchoModule],
    }),
    TelegrafModule.forRoot({
      name: GreeterBotName,
      token: '1435922623:AAHmBmnyqroHxDbuK6OKsLV8Y_oB_Lf9E6E', // Don't steal >:(
      middlewares: [sessionMiddleware],
      include: [GreeterModule],
    }),
    EchoModule,
    GreeterModule,
  ],
})
export class AppModule {}
