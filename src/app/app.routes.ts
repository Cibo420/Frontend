import { Routes } from '@angular/router';
import{ HomeComponent } from './pages/home/home.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { UniversitiesComponent } from './pages/universities/universities.component';
import { AboutComponent } from './pages/about/about.component';
import { CalculationComponent } from './pages/calculation/calculation.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'question', component: QuestionsComponent },
    { path: 'university', component: UniversitiesComponent },
    { path: 'about', component: AboutComponent },
    {path: 'calculation', component: CalculationComponent}
];
