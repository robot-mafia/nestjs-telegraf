import { Composer, Middleware, Telegraf } from 'telegraf';

export type Filter<T extends any[], F> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends F
    ? Filter<Tail, F>
    : [Head, ...Filter<Tail, F>]
  : [];

export type UpdateMethods = Exclude<
  keyof Composer<never>,
  'middleware' | 'guard' | 'filter' | 'drop'
>;
export type UpdateMethodArgs<T extends UpdateMethods> = Filter<
  Parameters<Composer<never>[T]>,
  Middleware<any>
>;
// type Test0 = Filter<[['foo', 'bar', 'booz'], ...Middleware<any>[]], Middleware<any>>;
// type Test1 = UpdateMethodArgs<'on'>;
// type Test2 = Parameters<Composer<never>['on']>;

export type TelegrafOption = ConstructorParameters<typeof Telegraf>[1];
export type TelegrafLaunchOption = Parameters<Telegraf['launch']>[0];
