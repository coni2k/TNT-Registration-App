import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration.component';

export function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

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
      declarations: [RegistrationComponent],
      providers: [FormBuilder],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        // component.ngOnInit();
        fixture.detectChanges();
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('#firstName');
    const event = createNewEvent('input');

    input.value = 'Serkan';
    input.dispatchEvent(event);

    expect(component.registrationForm.value).toEqual({
      firstName: 'Serkan',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });

  it('should update the value in the control', () => {
    component.registrationForm.patchValue({
      firstName: 'Serkan',
    });

    const input = fixture.nativeElement.querySelector('#firstName');

    expect(input.value).toBe('Serkan');
  });
});
