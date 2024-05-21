import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiURL = 'http://localhost:8081/question/all';
  //private state -> ukladat stav otazek -> priorita + odpoved na otazku

  constructor(private http:HttpClient) { }
  getQuestions(): Observable<string[]> {
    return this.http.get<string[]>(this.apiURL);
  }
  sendResults(data: any): Observable<any> {
    console.log(data);
    return this.http.post('http://localhost:8081/calculation', data);
  }
}
