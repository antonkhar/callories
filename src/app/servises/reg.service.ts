import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  private reg = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  getMyVariable(key: string | null) {
    if (key !== null) {
      this.reg = JSON.parse(localStorage.getItem(key)!);
      return JSON.parse(localStorage.getItem(key)!);
    }
  }

  setMyVariable(key: string, value: boolean) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
