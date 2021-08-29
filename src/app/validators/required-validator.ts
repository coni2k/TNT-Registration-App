import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control) {
      throw new Error('control cannot be null');
    }

    const value = (control.value || '').trim() as string;

    if (value === '') {
      return {
        required: true,
      };
    }

    return null;
  };
}
