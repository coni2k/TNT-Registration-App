import { FormBuilder, FormGroup } from '@angular/forms';
import { comparePasswordsValidator, passwordGroupValidators } from './password-group-validators';

describe('password group validators', () => {
  describe('strongPasswordValidator', () => {
    it('should throw error if group argument is null', () => {
      expect(() => passwordGroupValidators(null)).toThrowError('group cannot be null');
    });

    it(`should throw error if th group doesn't have the required controls`, () => {
      const group = new FormGroup({});
      expect(() => passwordGroupValidators(group)).toThrowError(
        'group must have "firstName", "lastName" and "password" controls'
      );
    });

    it(`should return "strongPassword" validation error, if password contains firstName or lastName`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        firstName: [],
        lastName: [],
        password: [],
      });

      // With default values (null)
      let result = passwordGroupValidators(group);
      expect(result).toEqual({ strongPassword: true });

      // With empty values
      const firstName = group.get('firstName');
      const lastName = group.get('lastName');
      const password = group.get('password');

      firstName.setValue('');
      lastName.setValue('');
      password.setValue('');

      result = passwordGroupValidators(group);
      expect(result).toEqual({ strongPassword: true });

      // First name is different, last name is the same
      firstName.setValue('first');
      lastName.setValue('last');
      password.setValue('last');

      result = passwordGroupValidators(group);
      expect(result).toEqual({ strongPassword: true });

      // Last name is different, first name is the same
      firstName.setValue('first');
      lastName.setValue('last');
      password.setValue('first');

      result = passwordGroupValidators(group);
      expect(result).toEqual({ strongPassword: true });
    });

    it(`should return null, if the password is different than both first name and last name`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        firstName: ['first'],
        lastName: ['last'],
        password: ['pass'],
      });

      const result = passwordGroupValidators(group);
      expect(result).toBeNull();
    });
  });

  describe('confirmPasswordValidator', () => {
    it('should throw error if group argument is null', () => {
      expect(() => comparePasswordsValidator(null)).toThrowError('group cannot be null');
    });

    it(`should throw error if th group doesn't have the required controls`, () => {
      const group = new FormGroup({});
      expect(() => comparePasswordsValidator(group)).toThrowError(
        'group must have "password" and "confirmPassword" controls'
      );
    });

    it(`should return "comparePasswords" validation error if passwords don't match`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        password: ['password'],
        confirmPassword: ['confirm'],
      });

      const result = comparePasswordsValidator(group);
      expect(result).toEqual({ comparePasswords: true });
    });

    it(`should return null if passwords match`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        password: ['password'],
        confirmPassword: ['password'],
      });

      const result = comparePasswordsValidator(group);
      expect(result).toBeNull();
    });
  });
});
