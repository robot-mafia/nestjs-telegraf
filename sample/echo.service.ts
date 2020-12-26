import { Injectable } from '@nestjs/common';

@Injectable()
export class EchoService {
  echo(text: string): string {
    return `Echo: ${text}`;
  }
}
