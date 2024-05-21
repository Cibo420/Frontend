import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniversityService } from '../universities/university.service';
import { Location } from '../universities/university';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit {
  questions: string[] = [];
  currentQuestionIndex = 0;
  currentQuestion: string = '';
  criteriaValue: number = 3; // Default value for slider
  priority: number = 3; // Default value for priority slider
  responses: any[] = []; // Array to hold responses
  cities: any[] = [];
  selectedCities: any[] = [];
  criteriaName: string = '';
 

  constructor(private questionService: QuestionService, private router: Router, private universityService: UniversityService ) {}

  ngOnInit(): void {
    this.universityService.getDistinctLocations().subscribe({
      next: data => this.cities = data,
      
      error: err => console.error('Failed to get cities:', err)
    });
    this.questionService.getQuestions().subscribe({
      next: (data: string[]) => {
        this.questions = data;
        this.responses = new Array(this.questions.length).fill({}).map(() => ({ value: 3, priority: 3 }));
        this.loadResponses();
        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          this.loadCurrentResponse();
        }
      },
      
      error: (err) => console.error('Failed to get questions:', err)
    });

  }

  loadResponses(): void {
    const storedResponses = sessionStorage.getItem('responses');
    if (storedResponses) {
      this.responses = JSON.parse(storedResponses);
    }
  }

  saveResponses(): void {
    sessionStorage.setItem('responses', JSON.stringify(this.responses));
  }

  loadCurrentResponse(): void {
    const response = this.responses[this.currentQuestionIndex];
    if (response) {
      this.criteriaValue = response.value;
      this.priority = response.priority;
    }
  }

  nextQuestion(): void {
    this.saveCurrentResponse();
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.loadCurrentResponse();
    }
  }

  previousQuestion(): void {
    this.saveCurrentResponse();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.loadCurrentResponse();
    }
  }

  saveCurrentResponse(): void {
    this.responses[this.currentQuestionIndex] = { value: this.criteriaValue, priority: this.priority };
    this.saveResponses();
  }
  onCitySelectionChange(event: any, cityId: number): void {
    if (event.target.checked) {
      this.selectedCities.push(cityId);
    } else {
      this.selectedCities = this.selectedCities.filter(id => id !== cityId);
    }
  }
  calculateProgress(): string {
    return ((this.currentQuestionIndex + 1) / this.questions.length * 100) + '%';
}

  finishTest(): void {
    // Here, prepare your final JSON and send it
    const finalData = {
        answers: this.responses,
        cities: this.selectedCities // This will be populated similarly once implemented
    };
    this.questionService.sendResults(finalData).subscribe({
      next: (response) => {
        console.log('Results sent successfully', response);

        //sessionStorage.removeItem('responses'); // Clean up
        sessionStorage.setItem('results',JSON.stringify(response)); // Store results for next page
        this.router.navigate(['/calculation']);
      },
      error: (err) => console.error('Failed to send results:', err)
    });
  }
}