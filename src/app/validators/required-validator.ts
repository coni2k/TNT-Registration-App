import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Validations
    if (!control) {
      throw new Error('control cannot be null');
    }

    // Default value
    const value = (control.value || '').trim() as string;

    // Required validation
    if (value === '') {
      return {
        required: { value: control.value },
      };
    }

    // Good to go 👍
    return null;
  };
}
