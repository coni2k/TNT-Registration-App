import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordExtendedValidator } from './password-extended-validator';

describe('passwordExtendedValidator', () => {
  it('should throw error if group argument is null', () => {
    expect(() => passwordExtendedValidator(null)).toThrowError('group cannot be null');
  });

  it(`should throw error if th group doesn't have the required controls`, () => {
    const group = new FormGroup({});
    expect(() => passwordExtendedValidator(group)).toThrowError(
      'Form must be have "firstName", "lastName" and "password" controls'
    );
  });

  it(`should throw error if th group doesn't have the required controls`, () => {
    const group = new FormGroup({});
    expect(() => passwordExtendedValidator(group)).toThrowError(
      'Form must be have "firstName", "lastName" and "password" controls'
    );
  });

  it(`should return "weakPassword" validation error, if password contains firstName or lastName`, () => {
    const fb = new FormBuilder();
    const group = fb.group({
      firstName: [],
      lastName: [],
      password: [],
    });

    // With default values (null)
    let result = passwordExtendedValidator(group);
    expect(result).toEqual({ weakPassword: true });

    // With empty values
    const firstName = group.get('firstName');
    const lastName = group.get('lastName');
    const password = group.get('password');

    firstName.setValue('');
    lastName.setValue('');
    password.setValue('');

    result = passwordExtendedValidator(group);
    expect(result).toEqual({ weakPassword: true });

    // First name is different, last name is the same
    firstName.setValue('first');
    lastName.setValue('last');
    password.setValue('last');

    result = passwordExtendedValidator(group);
    expect(result).toEqual({ weakPassword: true });

    // Last name is different, first name is the same
    firstName.setValue('first');
    lastName.setValue('last');
    password.setValue('first');

    result = passwordExtendedValidator(group);
    expect(result).toEqual({ weakPassword: true });
  });

  it(`should return null, if the password is different than both first name and last name`, () => {
    const fb = new FormBuilder();
    const group = fb.group({
      firstName: ['first'],
      lastName: ['last'],
      password: ['pass'],
    });

    const result = passwordExtendedValidator(group);
    expect(result).toBeNull();
  });
});
