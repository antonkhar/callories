import { Component, OnInit } from '@angular/core';
import { ReportDataService } from '../servises/report-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportDataService: ReportDataService) { }
  
  caloriesEaten: number = 0;
  dishesEaten: number = 0;
  dishesAdded: number = 0;
  daysOfUse: number = 0;

  


  ngOnInit() {
    // Подписываемся на изменения каждой переменной
    this.reportDataService.caloriesEaten.subscribe(value => this.caloriesEaten = value);
    this.reportDataService.dishesEaten.subscribe(value => this.dishesEaten = value);
    this.reportDataService.dishesAdded.subscribe(value => this.dishesAdded = value);
    this.reportDataService.daysOfUse.subscribe(value => this.daysOfUse = value);
  }
  saveInfo() {
    const temp: [string, number][] = [
      ["caloriesEaten", this.caloriesEaten],
      ["dishesEaten", this.dishesEaten],
      ["dishesAdded", this.dishesAdded],
      ["daysOfUse", this.daysOfUse],
    ];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(temp);
    
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    
    const blob: Blob = new Blob([wbout], { type: "application/octet-stream" });
    const url: string = URL.createObjectURL(blob);
    
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = url;
    link.download = "Report.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("saved");
  }
}
