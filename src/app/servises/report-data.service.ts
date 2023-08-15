import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {

  caloriesEaten: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  dishesEaten: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  dishesAdded: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  daysOfUse: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  setCaloriesEaten(value: number) {
    this.caloriesEaten.next(value);
  }

  setDishesEaten(value: number) {
    this.dishesEaten.next(value);
  }

  setDishesAdded(value: number) {
    this.dishesAdded.next(value);
  }

  setDaysOfUse(value: number) {
    this.daysOfUse.next(value);
  }

}
