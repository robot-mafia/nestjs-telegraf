import {
  Injectable,
  Inject,
  OnApplicationBootstrap,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';
import { TelegrafModuleOptions } from './interfaces';

@Injectable()
// @ts-ignore
export class TelegrafProvider<TContext extends ContextMessageUpdate>
  extends Telegraf<TContext>
  implements OnApplicationBootstrap, OnApplicationShutdown {
  private logger = new Logger('Telegraf');

  constructor(@Inject(TELEGRAF_MODULE_OPTIONS) options: TelegrafModuleOptions) {
    super(options.token, options.options);
  }

  onApplicationBootstrap() {
    this.catch((e) => {
      this.logger.error(e);
    });
    this.startPolling();
  }

  async onApplicationShutdown(signal?: string) {
    await this.stop();
  }
}
