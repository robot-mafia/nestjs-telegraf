import { Module, DynamicModule } from '@nestjs/common';
import { TelegrafCoreModule } from './telegraf-core.module';
import {
  TelegrafModuleOptions,
  TelegrafModuleAsyncOptions,
} from './interfaces';

@Module({})
export class TelegrafModule {
  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    return {
      module: TelegrafModule,
      imports: [TelegrafCoreModule.forRoot(options)],
      exports: [TelegrafCoreModule],
    };
  }

  public static forRootAsync(
    options: TelegrafModuleAsyncOptions
  ): DynamicModule {
    return {
      module: TelegrafModule,
      imports: [TelegrafCoreModule.forRootAsync(options)],
      exports: [TelegrafCoreModule],
    };
  }
}
