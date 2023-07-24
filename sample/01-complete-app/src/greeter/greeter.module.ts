import { Module } from '@nestjs/common';
import { GreeterUpdate } from './greeter.update';
import { RandomNumberScene } from './scenes/random-number.scene';
import { GreeterWizard } from './wizard/greeter.wizard';

@Module({
  providers: [GreeterUpdate, RandomNumberScene, GreeterWizard],
})
export class GreeterModule {}
