import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IslandsService {
  constructor(private http: HttpClient) {}

  fetchIslands(): Observable<any> {
    return this.http.get('http://localhost:5000/api/islands');
  }
}
