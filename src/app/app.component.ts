import { Component, Input, SimpleChanges } from '@angular/core';
import 'bootstrap';
import { RegService } from './servises/reg.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  interval: any;
  reg = this.regService.getMyVariable("1");

  constructor(private regService: RegService,private router: Router) { 
    this.reg = this.regService.getMyVariable("1");
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.myFunction();
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  myFunction() {
    this.reg = this.regService.getMyVariable("1");
  }

  clear(){
    localStorage.removeItem('1');
    this.router.navigate(['/']);
    console.log("ААААААААА");
    
  }
}
