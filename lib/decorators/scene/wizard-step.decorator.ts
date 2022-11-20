import { SetMetadata } from '@nestjs/common';
import { WizardStepMetadata } from '../../interfaces';
import { WIZARD_STEP_METADATA } from '../../telegraf.constants';

export const WizardStep = (step: number) =>
  SetMetadata<string, WizardStepMetadata>(WIZARD_STEP_METADATA, { step });
