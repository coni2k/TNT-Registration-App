import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationCompletedComponent } from './registration-completed.component';

describe('RegistrationCompletedComponent', () => {
  let component: RegistrationCompletedComponent;
  let fixture: ComponentFixture<RegistrationCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [RegistrationCompletedComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegistrationCompletedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
