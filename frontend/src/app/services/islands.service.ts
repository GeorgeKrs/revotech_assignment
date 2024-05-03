import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import appConfig from '../constants/server.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IslandsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  find(term: string | null = null): Observable<any> {
    if (term && term.trim().length > 0) {
      return this.http.get(
        `${appConfig.serverUrl}${
          appConfig.apiPrefix
        }/islands?term=${term.trim()}`
      );
    }

    return this.http.get(
      `${appConfig.serverUrl}${appConfig.apiPrefix}/islands`
    );
  }

  get(id: string): Observable<any> {
    return this.http.get(
      `${appConfig.serverUrl}${appConfig.apiPrefix}/islands/${id}`
    );
  }

  update(
    id: string,
    payload: {
      title: string | null;
      short_info: string | null;
      description: string | null;
    }
  ): Observable<any> {
    const authData = this.authService.getAuthData();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData?.sessionToken}`,
    });

    return this.http.put(
      `${appConfig.serverUrl}${appConfig.apiPrefix}/islands/${id}/update`,
      payload,
      { headers }
    );
  }

  redirectToIndex(): void {
    this.router.navigate(['/']);
  }

  redirectToShow(id: string): void {
    this.router.navigate([`/islands/${id}`]);
  }

  redirectToEdit(id: string): void {
    this.router.navigate([`/islands/${id}/edit`]);
  }
}
