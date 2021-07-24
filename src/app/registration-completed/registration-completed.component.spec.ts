import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistrationCompletedComponent } from './registration-completed.component';

describe('RegistrationCompletedComponent', () => {
  let component: RegistrationCompletedComponent;
  let fixture: ComponentFixture<RegistrationCompletedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
