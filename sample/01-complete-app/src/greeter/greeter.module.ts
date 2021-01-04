import { Module } from '@nestjs/common';
import { GreeterUpdate } from './greeter.update';

@Module({
  providers: [GreeterUpdate],
})
export class GreeterModule {}
