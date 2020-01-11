import { Type } from '@nestjs/common'
import { ContextTransformer } from '../interfaces'
import { addHandlerToStore } from './'

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
