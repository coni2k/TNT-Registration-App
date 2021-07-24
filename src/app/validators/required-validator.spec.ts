import { FormControl } from '@angular/forms';
import { requiredValidator } from './required-validator';

describe('requiredValidator', () => {
  it('should throw error if control argument is null', () => {
    const validator = requiredValidator();
    expect(() => validator(null)).toThrowError('control cannot be null');
  });

  it('should return "required" validation error if control.value is null or empty string', () => {
    const validator = requiredValidator();
    const control = new FormControl();

    // Null
    control.setValue(null);
    expect(validator(control)).toEqual({ required: { value: control.value } });

    // Empty
    control.setValue('');
    expect(validator(control)).toEqual({ required: { value: control.value } });

    // Whitepsace
    control.setValue(' ');
    expect(validator(control)).toEqual({ required: { value: control.value } });
  });

  it(`should return null if the value meets all the criteria`, () => {
    const validator = requiredValidator();
    const control = new FormControl();

    control.setValue('value');
    expect(validator(control)).toBeNull();
  });
});
