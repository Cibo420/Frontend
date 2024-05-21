import { Component, OnInit } from '@angular/core';
import { University } from './university';
import{ Location } from './university';
import { StudyProgram } from './university';
import { UniversityService } from './university.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UniversitiesComponent implements OnInit {
  universities: University[] = []; // use the University array type
  locations : Location[] = [];
  studyPrograms : StudyProgram[] = [];
  constructor(private universityService: UniversityService) {}
    ngOnInit(): void {
      this.universityService.getUniversities().subscribe({
        next: (universities: University[]) => {
          this.universities = universities;
        },
        error: (err) => console.error('Failed to get universities:', err)
      });
    }
  }