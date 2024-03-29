import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { comparePasswordsValidator, strongPasswordValidator } from '../validators/password-group-validators';
import { requiredValidator } from '../validators/required-validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  styleUrls: ['./registration.component.scss'],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  registrationForm = this.fb.group(
    {
      firstName: ['', [requiredValidator(), Validators.maxLength(256)]],
      lastName: ['', [requiredValidator(), Validators.maxLength(256)]],
      email: ['', [requiredValidator(), Validators.maxLength(256), Validators.email]],
      password: [''],
      confirmPassword: [''],
    },
    { validators: [strongPasswordValidator, comparePasswordsValidator] }
  );
  submitting = false;

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

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.submitting = true;
    this.registrationService
      .register(this.firstName.value, this.lastName.value, this.email.value, this.password.value)
      .pipe(
        catchError((err) => {
          this.snackBar.open('Something went wrong, please try again!', 'Dismiss', {
            duration: 5000,
          });
          return err;
        }),
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe(() => {
        this.router.navigate(['completed']);
      });
  }
}
