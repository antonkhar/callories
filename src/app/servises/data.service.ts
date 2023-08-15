import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {
  private data?: string[][];

  constructor(private http: HttpClient) { }

  getData(): Observable<string[][]> {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get("./assets/product_callories.csv", { responseType: 'text' })
        .pipe(
          map(data => data.split('\n').map(row => row.split(','))),
          tap(data => this.data = data)
        );
    }
  }
}