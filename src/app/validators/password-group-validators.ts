import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const strongPasswordValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  if (!group) {
    throw new Error('group cannot be null');
  }

  const firstNameControl = group.get('firstName');
  const lastNameControl = group.get('lastName');
  const passwordControl = group.get('password');

  if (!firstNameControl || !lastNameControl || !passwordControl) {
    throw new Error('group must have "firstName", "lastName" and "password" controls');
  }

  const firstName = (firstNameControl.value || '') as string;
  const lastName = (lastNameControl.value || '') as string;
  const password = (passwordControl.value || '') as string;
  let error = null;

  if (password.indexOf(firstName) > -1 || password.indexOf(lastName) > -1) {
    error = { invalid: true };
  } else {
    // Base regex: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$
    // https://stackoverflow.com/a/21456918/1087768
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{8,64}$');
    const result = regex.test(password);

    if (!result) {
      error = { invalid: true };
    }
  }

  passwordControl.setErrors(error);
  return error;
};

export const comparePasswordsValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  if (!group) {
    throw new Error('group cannot be null');
  }

  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    throw new Error('group must have "password" and "confirmPassword" controls');
  }

  const password = (passwordControl.value || '') as string;
  const confirmPassword = (confirmPasswordControl.value || '') as string;
  let error = null;

  if (password !== confirmPassword) {
    error = { invalid: true };
  }

  confirmPasswordControl.setErrors(error);
  return error;
};
