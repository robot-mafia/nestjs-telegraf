import { HandleParameters } from './HandleParameters'

export interface Handler {
  handle: (...args: any[]) => Promise<void>
  config: HandleParameters
}
