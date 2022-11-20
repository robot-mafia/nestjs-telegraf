import { Composer, Middleware } from 'grammy';

export type Filter<T extends any[], F> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends F
    ? Filter<Tail, F>
    : [Head, ...Filter<Tail, F>]
  : [];

export type OnlyFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type ParametersOrNever<T> = T extends (...args: any[]) => any ? Parameters<T> : never;

export type ComposerMethodArgs<
  T extends Composer<never>,
  U extends OnlyFunctionPropertyNames<T> = OnlyFunctionPropertyNames<T>,
> = Filter<ParametersOrNever<T[U]>, Middleware<never>>;
