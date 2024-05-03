import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IslandsService {
  constructor(private http: HttpClient) {}

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

  update(id: string, payload: any): Observable<any> {
    return this.http.put(`http://localhost:5000/api/islands/${id}/update`, {
      // title,
      // short_info,
      // description,
    });
  }
}
