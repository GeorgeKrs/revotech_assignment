import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import serverConfig from '../constants/server.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authData = new BehaviorSubject<any>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  readonly localStorageKey = 'revotechSessionToken';

  constructor(private http: HttpClient, private router: Router) {
    this.getAuthData();
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getAuthData()?.sessionToken}`,
    });

    return this.http.post(
      `${serverConfig.serverUrl}${serverConfig.apiPrefix}/auth/login`,
      {
        username,
        password,
      },
      { headers }
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getAuthData()?.sessionToken}`,
    });

    return this.http.post(
      `${serverConfig.serverUrl}${serverConfig.apiPrefix}/auth/logout`,
      {},
      { headers }
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

  getAuthData(): { username: string; sessionToken: string } | null {
    const storedAuthData = localStorage.getItem(this.localStorageKey);

    if (storedAuthData) {
      this.setAuthData(JSON.parse(storedAuthData));
    }

    return this.authData.getValue();
  }

  isLoggedIn(): boolean {
    return this.authData.getValue() !== null;
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
