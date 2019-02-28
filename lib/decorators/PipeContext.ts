import { Type } from '@nestjs/common'
import { ContextTransformer } from '../ContextTransformer'
import { addHandlerToStore } from './TelegramActionHandler'

export const PipeContext = <T>(transform: Type<ContextTransformer<T>>) => (
  target: Object,
  propertyKey: string,
  parameterIndex: number,
) => {
  addHandlerToStore(target, propertyKey, {
    transformations: [
      {
        index: parameterIndex,
        transform,
      },
    ],
  })
}
