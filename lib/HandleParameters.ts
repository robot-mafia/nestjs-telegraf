import { ContextTransformer } from './ContextTransformer'
import { Type } from '@nestjs/common'

interface ArgumentTransformation {
  index: number
  transform: Type<ContextTransformer>
}

export interface HandleParameters {
  onStart?: boolean
  command?: string
  transformations?: ArgumentTransformation[]
}
