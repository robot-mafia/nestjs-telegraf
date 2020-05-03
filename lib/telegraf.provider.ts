import {
  Injectable,
  Inject,
  OnApplicationBootstrap,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context, TelegrafModuleOptions } from './interfaces';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.constants';

@Injectable()
export class TelegrafProvider extends Telegraf<Context>
  implements OnApplicationBootstrap, OnApplicationShutdown {
  private logger = new Logger('Telegraf');
  private readonly launchOptions;

  constructor(@Inject(TELEGRAF_MODULE_OPTIONS) options: TelegrafModuleOptions) {
    super(options.token, options.options);
    this.launchOptions = options.launchOptions;
  }

  async onApplicationBootstrap() {
    this.catch((e) => {
      this.logger.error(e);
    });

    await this.launch(this.launchOptions);
  }

  async onApplicationShutdown() {
    await this.stop();
  }
}
