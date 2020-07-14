import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { RegistrationService } from '../registration.service';
import { comparePasswordsValidator, passwordGroupValidators } from '../validators/password-group-validators';
import { passwordValidator } from '../validators/password-validator';

@Component({
  selector: 'app-registration',
  styleUrls: ['./registration.component.scss'],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  registrationForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.maxLength(256)]],
      lastName: ['', [Validators.required, Validators.maxLength(256)]],
      email: ['', [Validators.required, Validators.maxLength(256), Validators.email]],
      password: ['', [passwordValidator()]],
      confirmPassword: ['', Validators.required],
    },
    { validators: [passwordGroupValidators, comparePasswordsValidator] }
  );

  get confirmPassword(): AbstractControl {
    return this.registrationForm.get('confirmPassword');
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }

  get firstName(): AbstractControl {
    return this.registrationForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registrationForm.get('lastName');
  }

  get password(): AbstractControl {
    return this.registrationForm.get('password');
  }

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) {}

  submit(): void {
    this.registrationService
      .register(this.firstName.value, this.lastName.value, this.email.value, this.password.value)
      .pipe(
        tap((response) => {
          console.log('response', response);
          this.router.navigate(['completed']);
        }),
        catchError((err) => {
          // TODO Something went wrong?
          return err;
        })
      )
      .subscribe();
  }
}
