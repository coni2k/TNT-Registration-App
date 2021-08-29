import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  register(firstName: string, lastName: string, email: string, password: string): Observable<User> {
    const url = environment.registerUrl;

    const body = {
      firstName,
      lastName,
      email,
      password,
    };

    return this.httpClient.post<User>(url, body);
  }
}
