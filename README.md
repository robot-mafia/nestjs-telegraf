# nest-telegram

Integrate [telegraf.js](https://telegraf.js.org/) to [NestJS](https://nestjs.com/) application.

> Warning! Package under development, please waiting for v1 release.

## Instalation 

`yarn add nest-telegram`

## Setup

### Add TelegramModule to your app

```ts
import { TelegramModule, TelegramModuleOptionsFactory } from 'nest-telegram'

// In real app, please, don't store token in source code
class TelegramOptionsFactory implements TelegramModuleOptionsFactory {
  createOptions(): TelegramModuleOptions {
    return {
      token: 'TelegramToken#1213',
      sitePublicUrl: 'https://my-site.com',
    }
  }
}

@Module({
  imports: [
    TelegramModule.fromFactory({,
      useClass: TelegramOptionsFactory,
    }),
    UtilsModule,
  ],
})
export class MyModule implements NestModule {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly telegramBot: TelegramBot,
  ) {}

  onModuleInit() {
    const isDev = process.env.NODE_ENV === 'development'

    this.telegramBot.init(this.moduleRef)

    if (isDev) {
      // in dev mode, we can't use webhook
      this.telegramBot.startPolling()
    }
  }

  // ...
}
```

### Add custom middleware to your app

```ts
import { TelegramBot } from 'nest-telegram'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'

async function bootstrap() {
  const isDev = process.env.NODE_ENV === 'development'

  const app = await NestFactory.create(AppModule)

  const bot = app.get(TelegramBot)

  if (!isDev) {
    app.use(bot.getMiddleware('hook-path'))
  }

  await app.listen(3000)
}
bootstrap()
```

## Usage

Now, you can decorate any method with `TelegramActionHandler`.

Example:

```ts
import { Injectable } from '@nestjs/common'
import { Context, PipeContext, TelegramActionHandler } from 'nest-telegram'

@Injectable()
export class HelpActions {
  @TelegramActionHandler({ onStart: true })
  async start(ctx: Context) {
    await ctx.reply('Hello!')
  }
}
```

Available actions for decorator:

+ `onStart` {boolean}, it triggers on `/start` command.
+ `command` {string}, it triggers on any command, e.g. — `@TelegramActionHandler({ command: '/help' })`.
+ `message` {string|RegExp}, it triggers on text message matching RegExp or string.

Also, you can write Transformators for context (like Pipes in NestJS). Example:

```ts
import { Injectable } from '@nestjs/common'
import { ContextTransformer, Context } from 'nest-telegram'

@Injectable()
class CurrentSender implements ContextTransformer<TokenPayloadModel> {
  async transform(ctx: Context) {
    const user = // get user from DB

    return {
      login: user.login,
      isManager: user.isManager,
    }
  }
}

@Injectable()
export class SomethingActions {
  @TelegramActionHandler({ command: '/say' })
  async say(
    ctx: Context,
    // apply this transformer like this
    @PipeContext(CurrentSender) user: TokenPayloadModel,
  ) {
    const { login } = user

    // now you can use `login`
    await ctx.reply(`Hello, ${login}`)
  }
}
```

Also, you can write `Catchers` for exceptions (like Filters in NestJS). Example:

```js
import { TelegramErrorHandler, TelegramCatch, Context } from 'nest-telegram'

@TelegramCatch(MyExecption)
export class MyCatcher
  implements TelegramErrorHandler<MyExecption> {
  public async catch(ctx: Context, exception: MyExecption) {
    await ctx.reply(exception.message)
  }
}
```

Stay tuned, stable release is coming. 🤓
