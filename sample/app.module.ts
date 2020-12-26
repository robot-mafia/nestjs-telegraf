import { Module } from '@nestjs/common';
import { TelegrafModule } from '../lib';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '1467731595:AAHCvH65H9VQYKF9jE-E8c2rXsQBVAYseg8',
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
