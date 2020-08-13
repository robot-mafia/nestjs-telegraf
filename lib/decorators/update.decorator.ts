import { SetMetadata } from '@nestjs/common';
import { DECORATORS } from '../telegraf.constants';

/**
 * `@Update` decorator, it's like NestJS `@Controller` decorator,
 * only for Telegram Bot API updates.
 */
export const Update = (): ClassDecorator => SetMetadata(DECORATORS.UPDATE, {});
