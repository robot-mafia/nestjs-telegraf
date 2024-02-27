import { Composer } from 'telegraf';
import { ComposerMethodArgs, OnlyFunctionPropertyNames } from '../types';
import { LISTENERS_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createListenerDecorator<
  TComposer extends Composer<never>,
  TMethod extends
    OnlyFunctionPropertyNames<TComposer> = OnlyFunctionPropertyNames<TComposer>,
>(method: TMethod) {
  return (...args: ComposerMethodArgs<TComposer, TMethod>): MethodDecorator => {
    return (
      target: object,
      _key?: string | symbol,
      descriptor?: TypedPropertyDescriptor<any>,
    ) => {
      const metadata = [
        {
          method,
          args,
        } as ListenerMetadata,
      ];

      if (descriptor) {
        const previousValue =
          Reflect.getMetadata(LISTENERS_METADATA, descriptor.value) || [];
        const value = [...previousValue, ...metadata];
        Reflect.defineMetadata(LISTENERS_METADATA, value, descriptor.value);
        return descriptor;
      }

      Reflect.defineMetadata(LISTENERS_METADATA, metadata, target);
      return target;
    };
  };
}
