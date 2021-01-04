import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { GreeterBotName } from './app.constants';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.ECHO_BOT_TOKEN,
      middlewares: [sessionMiddleware],
      include: [EchoModule],
    }),
    TelegrafModule.forRoot({
      name: GreeterBotName,
      token: process.env.GREETER_BOT_TOKEN,
      middlewares: [sessionMiddleware],
      include: [GreeterModule],
    }),
    EchoModule,
    GreeterModule,
  ],
})
export class AppModule {}
