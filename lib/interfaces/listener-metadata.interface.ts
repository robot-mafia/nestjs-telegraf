import { UpdateMethods } from '../telegraf.types';

export interface ListenerMetadata {
  method: UpdateMethods;
  args: unknown[];
}
