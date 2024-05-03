import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import serverConfig from '../constants/server.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authData = new BehaviorSubject<any>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  readonly localStorageKey = 'revotechSessionToken';

  constructor(private http: HttpClient) {
    const storedAuthData = localStorage.getItem(this.localStorageKey);

    if (storedAuthData) {
      this.setAuthData(JSON.parse(storedAuthData));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${serverConfig.serverUrl}${serverConfig.apiPrefix}/auth/login`,
      {
        username,
        password,
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${serverConfig.serverUrl}${serverConfig.apiPrefix}/auth/logout`,
      {}
    );
  }

  setAuthData(data: { username: string; sessionToken: string }): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    this.authData.next(data);
    this.loggedIn.next(true);
  }

  clearAuthData(): void {
    localStorage.removeItem(this.localStorageKey);
    this.authData.next(null);
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.authData.getValue() !== null;
  }
}
