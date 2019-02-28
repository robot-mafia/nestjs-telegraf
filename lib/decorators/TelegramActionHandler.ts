import { HandleParameters } from '../HandleParameters'

type Decorator = (
  params: HandleParameters,
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void

type HandlerDecorator = Decorator & {
  handlers?: Map<any, Map<string, HandleParameters>>
}

export const TelegramActionHandler: HandlerDecorator = (
  parameters: HandleParameters,
) => (target: any, propertyKey: string) => {
  // eslint-disable-next-line no-use-before-define
  addHandlerToStore(target, propertyKey, parameters)
}

export const addHandlerToStore = (
  instance: Object,
  name: string,
  config: HandleParameters,
) => {
  const handlerClass = instance.constructor

  if (!TelegramActionHandler.handlers) {
    TelegramActionHandler.handlers = new Map()
  }

  if (!TelegramActionHandler.handlers.get(handlerClass)) {
    TelegramActionHandler.handlers.set(handlerClass, new Map())
  }

  const oldParameters =
    TelegramActionHandler.handlers.get(handlerClass).get(name) || {}

  TelegramActionHandler.handlers.get(handlerClass).set(name, {
    ...oldParameters,
    ...config,
    transformations: [
      ...(oldParameters.transformations || []),
      ...(config.transformations || []),
    ],
  })
}
