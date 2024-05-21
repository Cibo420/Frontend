import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from './university';  // Ensure this path matches

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiURL = 'http://localhost:8081/university/all';

  constructor(private http: HttpClient) { }

  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.apiURL);
  }
  getDistinctLocations(): Observable<string[]> { // Fix: Updated return type to Observable<Location[]>

    return this.http.get<string[]>('http://localhost:8081/university');
  }
}
