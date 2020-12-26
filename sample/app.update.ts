import { On, Update } from '../lib/decorators';

@Update()
export class AppUpdate {
  @On('message')
  onMessage(): void {
    console.log('New message received');
  }
}
