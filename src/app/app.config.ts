import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { QuestionService } from './pages/questions/question.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(),
     QuestionService
    ]
  };
