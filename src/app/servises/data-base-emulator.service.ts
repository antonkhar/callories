import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {user} from "./user-interface.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: [number, string, number][] = [
    [0,"Яблоко",52],
    [1,"Банан",89],
    [2,"Абрикос",48],
    [3,"Авокадо",160],
    [4,"Виноград",67],
    [5,"Груша",57],
    [6,"Дыня",36],
    [7,"Апельсин",47],
    [8,"Мандарин",38],
    [9,"Грейпфрут",42],
    [10,"Лимон",29],
    [11,"Лайм",30],
    [12,"Ананас",50],
    [13,"Киви",61],
    [14,"Манго",60],
    [15,"Персик",39],
    [16,"Нектарин",44],
    [17,"Гранат",83],
    [18,"Грецкий орех",654],
    [19,"Арахис",567],
    [20,"Кешью",553],
    [21,"Миндаль",575],
    [22,"Фисташки",557],
    [23,"Фундук",628],
    [24,"Пекан",691],
    [25,"Семечки подсолнечника",584],
    [26,"Семечки тыквенные",574],
    [27,"Сухофрукты",271],
    [28,"Белый хлеб",265],
    [29,"Серый хлеб",235],
    [30,"Батон",260],
    [31,"Круассан",406],
    [32,"Черный хлеб",245],
    [33,"Булочка",266],
    [34,"Кекс",325],
    [35,"Каравай",266],
    [36,"Пирог с мясом",240],
    [37,"Пирог с капустой",220],
    [38,"Пирог с яблоками",200],
    [39,"Пирожное",200]
  ]

  private users: user[] = [
    {
      name: "Кеша",
      login: "stormy_78",
      password: "123321"
    },
    {
      name: "Антон",
      login: "PopAtush",
      password: "777777"
    },
    {
      name: "prrpodovatel",
      login: "Prepodovatel@mail.ru",
      password: "456654"
    }
  ]

  constructor() {
   }

  getProducts(key: string): Observable<[number, string, number][]> {
    if (localStorage.getItem(key) != null)  {
      this.products = JSON.parse(localStorage.getItem(key)!);
      return of(this.products).pipe(delay(1000));
    } else {
      return of(this.products).pipe(delay(1000));;
    }
  }

  getProduct(id: number): Observable<[number, string, number]> {
    const product = this.products.find(p => p[0] === id);
    if (product) {
      return of(product).pipe(delay(1000)); // имитируем задержку запроса на сервере
    }
    return throwError(`Продукт с ID ${id} не найден`);
  }

  addProduct(key: string,product: [number, string, number]): Observable<[number, string, number]> {
    const newProduct: [number, string, number] = product;
    this.products.push(newProduct);
    localStorage.setItem(key, JSON.stringify(this.products));
    return of(newProduct).pipe(delay(1000));
  }

  getUsers(key: string): Observable<user[]> {
    if (localStorage.getItem(key) != null)  {
      this.users = JSON.parse(localStorage.getItem(key)!);
      return of(this.users).pipe(delay(1000));
    } else {
      return of(this.users).pipe(delay(1000));;
    }
  }

  getUser(login: string): Observable<user> {
    const user = this.users.find(p => p.login === login);
    if (user) {
      return of(user).pipe(delay(1000)); // имитируем задержку запроса на сервере
    }
    return throwError(`Пользователь ${login} не найден`);
  }

  addUser(key: string, user: user): Observable<user> {
    const newUser: user = user;
    this.users.push(newUser);
    localStorage.setItem(key, JSON.stringify(this.users));
    return of(newUser).pipe(delay(1000));
  }

}
