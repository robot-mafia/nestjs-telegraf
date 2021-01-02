import { isObject } from '@nestjs/common/utils/shared.utils';

export function isErrorObject(err: any): err is Error {
  return isObject(err) && !!(err as Error).message;
}
