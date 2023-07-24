# Async configuration
When you need to pass module options asynchronously instead of statically, use the forRootAsync() method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
TelegrafModule.forRootAsync({
  useFactory: () => ({
    token: 'TELEGRAM_BOT_TOKEN',
  }),
});
```

Like other [factory providers](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory), our factory function can be async and can inject dependencies through inject.

```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule.forFeature(telegrafModuleConfig)],
  useFactory: async (configService: ConfigService) => ({
    token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
  }),
  inject: [ConfigService],
});
```

Alternatively, you can configure the TelegrafModule using a class instead of a factory, as shown below:

```typescript
TelegrafModule.forRootAsync({
  useClass: TelegrafConfigService,
});
```

The construction above instantiates `TelegrafConfigService` inside `TelegrafModule`, using it to create the required options object. Note that in this example, the `TelegrafConfigService` has to implement the `TelegrafOptionsFactory` interface, as shown below. The `TelegrafModule` will call the `createTelegrafOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class TelegrafConfigService implements TelegrafOptionsFactory {
  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: 'TELEGRAM_BOT_TOKEN',
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `TelegrafModule`, use the `useExisting` syntax.

```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule.forFeature(telegrafModuleConfig)],
  useExisting: ConfigService,
});
```
