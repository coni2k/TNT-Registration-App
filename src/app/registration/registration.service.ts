import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  register(firstName: string, lastName: string, email: string, password: string): Observable<unknown> {
    const url = 'https://demo-api.now.sh/users';

    const body = {
      firstName,
      lastName,
      email,
      password,
    };

    return this.httpClient.post(url, body);
  }
}
