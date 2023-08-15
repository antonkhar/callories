import { Component } from '@angular/core';
import { DataService } from '../servises/data.service';
import { ReportDataService } from '../servises/report-data.service';
import { ProductService } from '../servises/data-base-emulator.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  
  fruits: string[] = ['Яблоко', 'Груша', 'Апельсин', 'Банан'];
  products: [number,string,number][] = [];
  myArray: number [] = [];
  myArrayCount: number [] = [];
  selectedColoriesCount: number[] = [];
  selectedWaterCount : number = 0;
  

  constructor(private dataService: DataService, private reportDataService: ReportDataService, private productService: ProductService) {
    for (let index = 0; index < 4; index++) {
      this.selectedColoriesCount[index] = 0;
    }
  }

  getProducts(): void {
    this.productService.getProducts('products')
      .subscribe((products: [number,string,number][]) => this.products = products);
  }

  addProduct(product: [number,string,number]): void {
    this.productService.addProduct('products',product)
      .subscribe((newProduct: [number,string,number])  => this.products.push(newProduct));
  }

  ngOnInit(): void {
    this.getProducts();
    
  }

  onListItemClick(event: MouseEvent): void {
    const img = (event.target as HTMLElement).closest('.hider') as HTMLImageElement;;
    const listContainer = (event.target as HTMLElement).closest('.list-item');
    
    if (img && listContainer) {
      listContainer.classList.toggle('active');
      img.classList.toggle('active');
      img.style.opacity = '0';
      setTimeout(() => {
        if (img.src.endsWith('plus.png')) {
          img.src = '/assets/minus.png';
        } 
        else {
          img.src = '/assets/plus.png';
        }
        img.style.opacity = '1';
      }, 250);
    }
  }

  ngAfterViewInit() {
    this.myArray = [];
    this.myArrayCount = [];
    let tempArr: number[] = [];
    let tempArr2: string[] = [];
  
      // Числа введенных граммов
    const myInputs = document.querySelectorAll('.my-input-class2');
    myInputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        tempArr.push(Number(input.value));
      }
    });
    this.myArray.push(...tempArr);
    
    tempArr = [];
  
    // Числа каллорий продукта
    const myInputs2 = document.querySelectorAll('.my-input-class');
    myInputs2.forEach(input => {
      if (input instanceof HTMLInputElement) {
  
        const result = this.products.find(item => item[1] === input.value);
        if (result) {
          const value = result[2];
          console.log(value);
          tempArr.push(Number(value));
        }
        else{
          console.log("Введены неверные данные");
          
        }
        
        // tempArr.push(value);
        tempArr2.push(input.value);
      }
    });
    if(tempArr2.length == 4 && this.myArray.every(num => num > 0)){
      this.myArrayCount.push(...tempArr);

      console.log(this.myArray);
      console.log(this.myArrayCount);
      
      for (let index = 0; index < 4; index++) {
        this.selectedColoriesCount[index] = this.myArray[index] * (this.myArrayCount[index]/100);
      }

      this.reportDataService.setDishesEaten(this.reportDataService.dishesEaten.getValue() + 4)
      this.reportDataService.setDaysOfUse(this.reportDataService.daysOfUse.getValue() + 1)
      for (let index = 0; index < this.selectedColoriesCount.length; index++) {
        this.reportDataService.setCaloriesEaten(Math.round(this.reportDataService.caloriesEaten.getValue() + this.selectedColoriesCount[index]))
      }

      this.myArray = [];
      this.myArrayCount = [];
      tempArr = [];
      tempArr2 = [];

            // Вода
            const myInputs3 = document.querySelectorAll('.my-input-class3');
            myInputs3.forEach(input => {
              if (input instanceof HTMLInputElement) {
                tempArr.push(Number(input.value));
              }
            });
            if(tempArr[0] >= 0){
              const result = tempArr[1] - tempArr[0];
              if(result > 0){
                this.selectedWaterCount = result
              }
              else{
                this.selectedWaterCount = 0
              }
            }
            else{
              console.log("Укажите колличество выпитой воды");
            }
            
            
            tempArr = [];
    }
    else
    {
      console.log("Введены неверные данные!!!");
      this.myArray = [];
      this.myArrayCount = [];
      tempArr = [];
      tempArr2 = [];
    }
  }
}
