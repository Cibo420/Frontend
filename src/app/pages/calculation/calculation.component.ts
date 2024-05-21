import { Component, OnInit } from '@angular/core';
import { StudyProgram } from './calculation';
import { CalculationService } from './calculation.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-calculation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css'
})
export class CalculationComponent implements OnInit {
  // inicializovat cities 
  studyPrograms: any[] = [];; // use the StudyProgram array type
  studyProgramDetails: any = {};

  constructor(private calculationService: CalculationService) {}
  ngOnInit(): void {
    const results = sessionStorage.getItem('results');
    if (results) {
      this.studyPrograms = JSON.parse(results);
      const ids = this.studyPrograms.map(program => program.schoolId)
                                   .filter((id, index, self) => self.indexOf(id) === index);  // Ensure unique IDs
      this.fetchStudyProgramDetails(ids);
    }
  }

  private fetchStudyProgramDetails(ids: number[]): void {
    if (ids.length > 0) {
      this.calculationService.getStudyProgramsByIds(ids).subscribe({
        next: (programs) => {
          programs.forEach(program => {
            this.studyProgramDetails[program.id] = program;  // Store entire program details keyed by ID
          });
        },
        error: (err) => console.error('Failed to load study programs:', err)
      });
    }
  }
}
