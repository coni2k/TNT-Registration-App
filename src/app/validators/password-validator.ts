import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Validations
    if (!control) {
      throw new Error('control cannot be null');
    }

    // Default value
    const value = (control.value || '') as string;

    // Required validation
    if (value === '') {
      return {
        required: { value: control.value },
      };
    }

    // Base regex: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$
    // https://stackoverflow.com/a/21456918/1087768
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{8,64}$');
    const result = regex.test(control.value);

    if (!result) {
      return { regex: { value: control.value } };
    }

    // Good to go 👍
    return null;
  };
}
