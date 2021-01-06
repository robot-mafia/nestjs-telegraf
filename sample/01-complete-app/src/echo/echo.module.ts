import { Module } from '@nestjs/common';
import { EchoUpdate } from './echo.update';
import { EchoService } from './echo.service';
import { HelloScene } from '../greeter/scenes/hello.scene';

@Module({
  providers: [EchoUpdate, EchoService, HelloScene],
})
export class EchoModule {}
