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

  // TODO Other form validation & submit tests
});
