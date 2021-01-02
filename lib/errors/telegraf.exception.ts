import { isObject, isString } from '@nestjs/common/utils/shared.utils';

export class TelegrafException extends Error {
  constructor(private readonly error: string | object) {
    super();
    this.initMessage();
  }

  // TODO: Check real error format
  public initMessage() {
    if (isString(this.error)) {
      this.message = this.error;
    } else if (
      isObject(this.error) &&
      isString((this.error as Record<string, any>).message)
    ) {
      this.message = (this.error as Record<string, any>).message;
    } else if (this.constructor) {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ');
    }
  }
}
