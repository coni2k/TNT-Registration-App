import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  it('should create a service', () => {
    const service = new RegistrationService(null);
    expect(service).toBeDefined();
  });

  // TODO register function tests?
});
