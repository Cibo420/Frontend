import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calculation, StudyProgram } from './calculation';  // Ensure this path matches

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  private apiURL = 'http://localhost:8081/calculation';

  constructor(private http: HttpClient) { }

  getCalculation(): Observable<StudyProgram[]> {
    return this.http.get<StudyProgram[]>(this.apiURL);
  }
  getStudyProgramsByIds(ids: number[]): Observable<StudyProgram[]> {
    let params = new HttpParams();
    params = params.set('ids', ids.join(','));

    return this.http.get<StudyProgram[]>(`http://localhost:8081/studyProgram/byIds`, { params });
  }
}