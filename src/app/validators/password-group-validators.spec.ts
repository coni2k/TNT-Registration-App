import { FormBuilder, FormGroup } from '@angular/forms';
import { comparePasswordsValidator, strongPasswordValidator } from './password-group-validators';

describe('password group validators', () => {
  describe('strongPasswordValidator', () => {
    it('should throw error if group argument is null', () => {
      expect(() => strongPasswordValidator(null)).toThrowError('group cannot be null');
    });

    it(`should throw error if the group doesn't have the required controls`, () => {
      const group = new FormGroup({});
      expect(() => strongPasswordValidator(group)).toThrowError(
        'group must have "firstName", "lastName" and "password" controls'
      );
    });

    it(`should return "invalid" if the password contains first or last name or doesn't meet the regex criteria`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        firstName: [],
        lastName: [],
        password: [],
      });

      // With default values (null)
      let result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // With empty values
      const firstName = group.get('firstName');
      const lastName = group.get('lastName');
      const password = group.get('password');

      firstName.setValue('');
      lastName.setValue('');
      password.setValue('');

      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // First name is different, last name is the same
      firstName.setValue('first');
      lastName.setValue('last');
      password.setValue('last');

      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // Last name is different, first name is the same
      firstName.setValue('first');
      lastName.setValue('last');
      password.setValue('first');

      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // 7 characters
      password.setValue('1234567');
      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // 65 characters
      password.setValue('12345678901234567890123456789012345678901234567890123456789012345');
      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // 8 characters but only numbers
      password.setValue('12345678');
      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // 8 characters but only numbers & one lowercase
      password.setValue('1234567a');
      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // 8 characters but only numbers & one uppercase
      password.setValue('1234567A');
      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });

      // 8 characters & one lowercase & one uppercase, but contains an invalid special character
      password.setValue('Aa+12345');
      result = strongPasswordValidator(group);
      expect(result).toEqual({ invalid: true });
    });

    it(`should return null if the password doesn't contain first or last name and meets the regex criteria`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        firstName: ['first'],
        lastName: ['last'],
        password: ['Aa@$!%*?&0123456789'],
      });

      const result = strongPasswordValidator(group);
      expect(result).toBeNull();
    });
  });

  describe('confirmPasswordValidator', () => {
    it('should throw error if group argument is null', () => {
      expect(() => comparePasswordsValidator(null)).toThrowError('group cannot be null');
    });

    it(`should throw error if the group doesn't have the required controls`, () => {
      const group = new FormGroup({});
      expect(() => comparePasswordsValidator(group)).toThrowError(
        'group must have "password" and "confirmPassword" controls'
      );
    });

    it(`should return "invalid" if passwords don't match`, () => {
      const fb = new FormBuilder();
      const group = fb.group({
        password: ['password'],
        confirmPassword: ['confirm'],
      });

      const result = comparePasswordsValidator(group);
      expect(result).toEqual({ invalid: true });
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
