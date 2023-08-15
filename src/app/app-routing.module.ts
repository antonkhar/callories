import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DiaryComponent } from './diary/diary.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ReportComponent } from './report/report.component';
import { RegistrFormComponent } from './registr-form/registr-form.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'calculator', component: CalculatorComponent},
  { path: '', component: RegistrFormComponent},
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
