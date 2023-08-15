import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DiaryComponent } from './diary/diary.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ReportComponent } from './report/report.component';
import { DataService } from './servises/data.service';
import { ReportDataService } from './servises/report-data.service';
import { ProductService } from './servises/data-base-emulator.service';
import { RegistrFormComponent } from './registr-form/registr-form.component';
import { RegService } from './servises/reg.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DiaryComponent,
    CalculatorComponent,
    ReportComponent,
    RegistrFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule 
  ],
  providers: [DataService,ReportDataService,ProductService,RegService],
  bootstrap: [AppComponent]
})
export class AppModule { }
