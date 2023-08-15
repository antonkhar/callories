import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegService } from '../servises/reg.service';
import { ProductService } from '../servises/data-base-emulator.service';
import { user } from '../servises/user-interface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registr-form',
  templateUrl: './registr-form.component.html',
  styleUrls: ['./registr-form.component.scss']
})
export class RegistrFormComponent implements OnInit {

  @Output() valueChanged = new EventEmitter<boolean>();
  password!: string;
  login!: string;
  registrPassword!: string
  registrPasswordVert!: string
  registrlogin!: string
  isLogin = true;

  entrance() {
    const tempArr$ = this.productService.getUsers('users');
    let check = false;
    tempArr$.subscribe(tempArr => {
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].login === this.login && tempArr[i].password === this.password) {
          check = true;
        }
      }
      if (check) {
        this.isLogin = true;
        this.regService.setMyVariable("1",true);
        this.goToHomePage()
      }
      else
      {
        alert("Пользователь не найден!");
      }
    });
  }

  registration() {
    const tempArr$ = this.productService.getUsers('users');
    let check = true;
    tempArr$.subscribe(tempArr => {
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].login === this.registrlogin) {
          check = false;
        }
      }
      if (check) {
        if(this.registrPasswordVert == this.registrPassword){
          const user: user = {
            name: "аа",
            login: this.registrlogin,
            password: this.registrPassword
          }
          this.productService.addUser('users',user);
          this.registrPassword = "";
          this.registrPasswordVert = "";
          this.registrlogin = "";
          alert("Спасибо за регистрацию!");
          this.toggle()
        }
        else{
          alert("Пароль не совпадает!");
        }
      }
      else
      {
        alert("Логин занят!");
      }
    });
  }

  goToHomePage() {
    this.router.navigate(['/main']);
  }
  

  constructor(private regService: RegService, private productService: ProductService, private router: Router) {

  }

  toggle() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit(): void {
  }
}
