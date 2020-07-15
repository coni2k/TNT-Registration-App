import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordGroupValidators: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  // Validations
  if (!group) {
    throw new Error('group cannot be null');
  }

  const firstNameControl = group.get('firstName');
  const lastNameControl = group.get('lastName');
  const passwordControl = group.get('password');

  if (!firstNameControl || !lastNameControl || !passwordControl) {
    throw new Error('group must have "firstName", "lastName" and "password" controls');
  }

  // Default values
  const firstName = (firstNameControl.value || '') as string;
  const lastName = (lastNameControl.value || '') as string;
  const password = (passwordControl.value || '') as string;
  let passwordErrors = passwordControl.errors;

  if (password.indexOf(firstName) > -1 || password.indexOf(lastName) > -1) {
    // Set an error for password control
    if (passwordErrors) {
      passwordErrors.strongPassword = true;
    } else {
      passwordErrors = {
        strongPassword: true,
      };
    }
    passwordControl.setErrors(passwordErrors);

    // Return an error for the form
    return { strongPassword: true };
  }

  // Clear the error from password control
  if (passwordErrors) {
    delete passwordErrors.strongPassword;

    if (Object.keys(passwordErrors).length === 0) {
      passwordErrors = null;
    }
  }
  passwordControl.setErrors(passwordErrors);

  // Return no errors for the form
  return null;
};

export const comparePasswordsValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  // Validations
  if (!group) {
    throw new Error('group cannot be null');
  }

  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    throw new Error('group must have "password" and "confirmPassword" controls');
  }

  // Default values
  const password = (passwordControl.value || '') as string;
  const confirmPassword = (confirmPasswordControl.value || '') as string;

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({
      comparePasswords: true,
    });

    return { comparePasswords: true };
  }

  confirmPasswordControl.setErrors(null);
  return null;
};
