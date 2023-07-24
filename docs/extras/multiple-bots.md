# Multiple bots
In some cases, you may need to run multiple bots at the same time. This can also be achieved with this module. To work with multiple bots, first create the bots. In this case, bot naming becomes mandatory.
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: 'cat',  
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('CAT_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegrafModuleConfig)],
      botName: 'dog',  
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('DOG_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

:::caution
Please note that you shouldn't have multiple bots without a name, or with the same name, otherwise they will get overridden.
:::

You can also inject the `Bot` for a given bot:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectBot, Telegraf, Context } from 'nestjs-telegraf';

@Injectable()
export class EchoService {
  constructor(@InjectBot('cat') private catBot: Telegraf<Context>) {}
}
```
To inject a given `Bot` to a custom provider (for example, factory provider), use the `getBotToken()` function passing the name of the bot as an argument.
```typescript
{
  provide: CatsService,
  useFactory: (catBot: Telegraf<Context>) => {
    return new CatsService(catBot);
  },
  inject: [getBotToken('cat')],
}
```
Another useful feature of the `nestjs-telegraf` module is the ability to choose which modules should handle updates for each launched bot. By default, module searches for handlers throughout the whole app. To limit this scan to only a subset of modules, use the include property.

```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule],
  botName: 'cat',  
  useFactory: (configService: ConfigService) => ({
    token: configService.get<string>('CAT_BOT_TOKEN'),
    include: [CatsModule],  
  }),
  inject: [ConfigService],
}),
```
