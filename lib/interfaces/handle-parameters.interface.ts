import { ContextTransformer } from './'
import { HearsTriggers } from 'telegraf'
import { UpdateType, MessageSubTypes } from 'telegraf/typings/telegram-types'
import { Type } from '@nestjs/common'

interface ArgumentTransformation {
  index: number
  transform: Type<ContextTransformer>
}

export interface HandleParameters {
  onStart?: boolean
  on?: UpdateType | UpdateType[] | MessageSubTypes | MessageSubTypes[]
  command?: string
  message?: string | RegExp
  action?: HearsTriggers
  transformations?: ArgumentTransformation[]
}
