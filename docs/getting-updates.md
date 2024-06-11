# Getting updates
## Long polling

By default, the bot receives updates using long-polling and requires no additional action.

## Webhooks

If you want to configure a telegram bot webhook, you need to get a middleware via `getBotToken` helper in your `main.ts` file.

To access it, you must use the `app.get()` method, followed by the provider reference:
```typescript
import { getBotToken } from 'nestjs-telegraf';

// ...
const bot = app.get(getBotToken());
```

Now you can connect middleware:
```typescript
app.use(bot.webhookCallback('/secret-path'));
```

The last step is to specify `launchOptions` in `forRoot` method:
```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
    launchOptions: {
      webhook: {
        domain: 'domain.tld',
        path: '/secret-path',
      }
    }
  }),
  inject: [ConfigService],
});
```
If you don't want to receive updates, you need to set `launchOptions` to `false`.
