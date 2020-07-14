import { FormControl } from '@angular/forms';
import { passwordValidator } from './password-validator';

describe('passwordValidator', () => {
  it('should throw error if control argument is null', () => {
    const validator = passwordValidator();
    expect(() => validator(null)).toThrowError('control cannot be null');
  });

  it('should return validation error if control.value is null or empty string', () => {
    const validator = passwordValidator();
    const control = new FormControl();
    expect(validator(control)).toEqual({ required: { value: control.value } });
  });

  it(`should return "forbidden" validation error if the value contains one of the "forbidden words"`, () => {
    const validator = passwordValidator(['bob']);
    const control = new FormControl('12345bob');
    expect(validator(control)).toEqual({ forbidden: { value: control.value } });
  });

  it(`should return "regex" validation error if the value doesn't meet the criteria`, () => {
    const validator = passwordValidator();
    const control = new FormControl();

    // 7 characters
    control.setValue('1234567');
    expect(validator(control)).toEqual({ regex: { value: control.value } });

    // 65 characters
    control.setValue('12345678901234567890123456789012345678901234567890123456789012345');
    expect(validator(control)).toEqual({ regex: { value: control.value } });

    // 8 characters but only numbers
    control.setValue('12345678');
    expect(validator(control)).toEqual({ regex: { value: control.value } });

    // 8 characters but only numbers & one lowercase
    control.setValue('1234567a');
    expect(validator(control)).toEqual({ regex: { value: control.value } });

    // 8 characters but only numbers & one uppercase
    control.setValue('1234567A');
    expect(validator(control)).toEqual({ regex: { value: control.value } });

    // 8 characters & one lowercase & one uppercase, but contains an invalid special character
    control.setValue('Aa+12345');
    expect(validator(control)).toEqual({ regex: { value: control.value } });
  });

  it(`should return null if the value meets all the criteria`, () => {
    const validator = passwordValidator();
    const control = new FormControl();

    control.setValue('Aa@$!%*?&0123456789');
    expect(validator(control)).toBeNull();
  });
});
