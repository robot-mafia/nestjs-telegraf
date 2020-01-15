import { ContextTransformer } from './'
import { HearsTriggers } from 'telegraf'
import { Type } from '@nestjs/common'

interface ArgumentTransformation {
  index: number
  transform: Type<ContextTransformer>
}

export interface HandleParameters {
  onStart?: boolean
  command?: string
  message?: string | RegExp
  action?: HearsTriggers
  transformations?: ArgumentTransformation[]
}
