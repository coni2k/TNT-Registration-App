import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

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

    console.log('url', url);
    console.log('body', body);

    // return this.httpClient.post(url, body).pipe(
    //   tap((result) => {
    //     console.log('r', result);
    //   })
    // );
    // return of(null);

    return timer(4000).pipe(
      map(() => {
        console.log('ok..');
        return null;
      })
    );
  }
}
