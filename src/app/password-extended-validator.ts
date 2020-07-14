import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordExtendedValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  // Validations
  if (!group) {
    throw new Error('group cannot be null');
  }

  const firstNameControl = group.get('firstName');
  const lastNameControl = group.get('lastName');
  const passwordControl = group.get('password');

  if (!firstNameControl || !lastNameControl || !passwordControl) {
    throw new Error('Form must be have "firstName", "lastName" and "password" controls');
  }

  // Default values
  const firstName = (firstNameControl.value || '') as string;
  const lastName = (lastNameControl.value || '') as string;
  const password = (passwordControl.value || '') as string;

  if (password.indexOf(firstName) > -1 || password.indexOf(lastName) > -1) {
    return { weakPassword: true };
  }

  return null;
};
