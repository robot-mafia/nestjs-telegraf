# Standalone applications
If you initialized your application with the [Nest CLI](https://docs.nestjs.com/cli/overview), [Express](https://expressjs.com/) framework will be installed by default along with Nest. Nest and NestJS Telegraf does not require Express for work. So if you don't plan to getting bot updates through webhooks, and you don't need a web server, you can remove Express. 

To do this, change the `bootstrap` function in the `main.ts` file of your project on something like that:
```typescript
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
```

This initializes Nest as a **standalone application** (without any network listeners).

All that remains is to remove unused dependencies:
```bash
npm un @nestjs/platform-express @types/express
```

:::info
More information about standalone applications located at [Nest documentation](https://docs.nestjs.com/standalone-applications)
:::
