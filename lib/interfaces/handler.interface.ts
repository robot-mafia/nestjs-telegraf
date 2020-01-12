import { HandleParameters } from './'

export interface Handler {
  handle: (...args: any[]) => Promise<void>
  config: HandleParameters
}
