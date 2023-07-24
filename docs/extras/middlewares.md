# Middlewares
`nestjs-telegraf` has support of the Telegraf middleware packages. To use an existing middleware package, simply import it and add it to the middlewares array:
```typescript
TelegrafModule.forRoot({
  middlewares: [session()],  
}),
```
