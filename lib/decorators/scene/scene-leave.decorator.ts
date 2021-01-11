import { createListenerDecorator } from '../../utils';
import { Scenes } from 'telegraf';

export const SceneLeave = createListenerDecorator<Scenes.BaseScene<never>>(
  'leave',
);
