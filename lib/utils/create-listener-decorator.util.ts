import { Composer } from 'telegraf';
import { ComposerMethodArgs, ComposerMethods } from '../types';
import { LISTENERS_METADATA } from '../telegraf.constants';
import { ListenerMetadata } from '../interfaces';

export function createListenerDecorator<
  TComposer extends Composer<never>,
  TMethod extends ComposerMethods,
>(method: TMethod) {
  return (...args: ComposerMethodArgs<TComposer, TMethod>): MethodDecorator => {
    return (
      _target: any,
      _key?: string | symbol,
      descriptor?: TypedPropertyDescriptor<any>,
    ) => {
      const metadata = [
        {
          method,
          args,
        } as ListenerMetadata,
      ];

      const previousValue =
        Reflect.getMetadata(LISTENERS_METADATA, descriptor.value) || [];
      const value = [...previousValue, ...metadata];
      Reflect.defineMetadata(LISTENERS_METADATA, value, descriptor.value);
      return descriptor;
    };
  };
}
