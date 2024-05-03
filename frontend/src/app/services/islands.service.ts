import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IslandsService {
  constructor(private http: HttpClient, private router: Router) {}

  find(term: string | null = null): Observable<any> {
    if (term && term.trim().length > 0) {
      return this.http.get(
        `http://localhost:5000/api/islands?term=${term.trim()}`
      );
    }

    return this.http.get('http://localhost:5000/api/islands');
  }

  get(id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/islands/${id}`);
  }

  update(
    id: string,
    payload: {
      title: string | null;
      short_info: string | null;
      description: string | null;
    }
  ): Observable<any> {
    console.log('in service update');
    return this.http.put(
      `http://localhost:5000/api/islands/${id}/update`,
      payload
    );
  }

  redirectToIndex(): void {
    this.router.navigate(['/']);
  }

  redirectToShow(id: string): void {
    this.router.navigate(['/islands/:id']);
  }

  redirectToEdit(id: string): void {
    this.router.navigate(['/islands/:id/edit']);
  }
}
