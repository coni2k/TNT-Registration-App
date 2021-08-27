import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
          MatSnackBarModule,
          AppRoutingModule,
        ],
        declarations: [RegistrationComponent],
        providers: [
          FormBuilder,
          {
            provide: RegistrationService,
            useValue: {},
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(RegistrationComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should return "regex" validation error if the value doesn't meet the criteria`, () => {
    // To avoid passwordGroupValidators errors
    component.firstName.setValue('firstName');
    component.lastName.setValue('lastName');

    // 7 characters
    component.password.setValue('1234567');
    expect(component.password.hasError('pattern')).toBeTruthy();

    // 65 characters
    component.password.setValue('12345678901234567890123456789012345678901234567890123456789012345');
    expect(component.password.hasError('pattern')).toBeTruthy();

    // 8 characters but only numbers
    component.password.setValue('12345678');
    expect(component.password.hasError('pattern')).toBeTruthy();

    // 8 characters but only numbers & one lowercase
    component.password.setValue('1234567a');
    expect(component.password.hasError('pattern')).toBeTruthy();

    // 8 characters but only numbers & one uppercase
    component.password.setValue('1234567A');
    expect(component.password.hasError('pattern')).toBeTruthy();

    // 8 characters & one lowercase & one uppercase, but contains an invalid special character
    component.password.setValue('Aa+12345');
    expect(component.password.hasError('pattern')).toBeTruthy();
  });

  it(`should return null if the value meets all the criteria`, () => {
    // To avoid passwordGroupValidators errors
    component.firstName.setValue('firstName');
    component.lastName.setValue('lastName');

    component.password.setValue('Aa@$!%*?&0123456789');

    expect(component.password.invalid).toBeFalse();
  });

  // TODO Other form validation & submit tests
});
