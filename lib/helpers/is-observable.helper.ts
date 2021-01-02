import { isFunction } from '@nestjs/common/utils/shared.utils';

export function isObservable(result: any): boolean {
  return result && isFunction(result.subscribe);
}
