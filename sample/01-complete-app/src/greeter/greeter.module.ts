import { Module } from '@nestjs/common';
import { GreeterUpdate } from './greeter.update';
import { RandomNumberScene } from './scenes/random-number.scene';

@Module({
  providers: [GreeterUpdate, RandomNumberScene],
})
export class GreeterModule {}
