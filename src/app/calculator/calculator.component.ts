import { Component, OnInit} from '@angular/core';
import { DataService } from '../servises/data.service';
import { ReportDataService } from '../servises/report-data.service';
import { ProductService } from '../servises/data-base-emulator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  
  selectedFruitName: string = '';
  fileText: string = '';
  foodName: string = 'Введите название блюда!';
  selectedColoriesCount: number = 0;
  ColoriesCount: number = 0;
  caloriesInHundred: number = 0;
  sumColoriesPorcies: number = 0;
  myArray: number [][] = [[],[]];
  myArrayName: string [] = [];
  products: [number,string,number][] = [];
  inputValues: string[] = [];

  ngAfterViewInit() {
    this.myArray[0] = [];
    this.myArray[1] = [];
    this.myArrayName = [];
    let tempArr: number[] = [];
    let tempArr2: string[] = [];

    // Числа введенных граммов
    const myInputs = document.querySelectorAll('.my-input-class2');
    myInputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        tempArr.push(Number(input.value));
      }
    });
    this.myArray[0].push(...tempArr);
  
    tempArr = [];

    // Числа каллорий продукта
    const myInputs2 = document.querySelectorAll('.my-input-class');
    myInputs2.forEach(input => {
      if (input instanceof HTMLInputElement) {

        const result = this.products.find(item => item[1] === input.value);
        const value = result ? result[2] : null;

        tempArr.push(value!);
        tempArr2.push(input.value);
      }
    });
    this.myArray[1].push(...tempArr);
    this.myArray[2] = [];
    this.myArrayName.push(...tempArr2);

    tempArr = [];
    tempArr2 = [];

    this.saveInfo(this.myArrayName, this.myArray[1],this.myArray[0])

  }

  // Группа методов обращения к серверу
  getProducts(): void {
    this.productService.getProducts('products')
      .subscribe((products: [number,string,number][]) => this.products = products);
  }

  addProduct(product: [number,string,number]): void {
    this.productService.addProduct('products',product)
      // .subscribe(newProduct => this.products.push(newProduct));
  }
  // Конец группы методов обращения к серверу

  onSelectedFruitNameChanged() {
    this.onColoriesCount()
  }

  onSelectedColoriesCountChanged() {
    this.onColoriesCount()
  }

  getCountByName(name: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i][1] === name) {
        return this.products[i][2];
      }
    }
    return null;
  }

  onColoriesCount() {
    const count = this.getCountByName(this.selectedFruitName)
    
    if(count!= null && this.selectedColoriesCount > 0){
      const item = (count/100) * this.selectedColoriesCount
      this.ColoriesCount = item
    }
    else{
      this.ColoriesCount = 0;
      console.log("Неверные данные");
    }
  }

  constructor(private dataService: DataService,private reportDataService: ReportDataService, private productService: ProductService) {
    this.dataService.getData().subscribe((result: any[]) => {
      this.products = result;
    });       
  }

  ngOnInit(): void {
    this.initDuplicateBlockButton();
    this.getProducts();
    
  }

  initDuplicateBlockButton() {
    const button = document.getElementById("duplicate-button");
    button?.addEventListener("click", this.duplicateBlock);
  }

  duplicateBlock() {
    var originalBlock = document.getElementById("original-block");
    var blockContainer = document.getElementById("block-container");
    if (originalBlock !== null && blockContainer !== null) {
      // Клонируем оригинальный блок
      var clonedBlock = originalBlock.cloneNode(true);
      // Добавляем клонированный блок в контейнер для блоков
      blockContainer.appendChild(clonedBlock);
    }
  }

  deleteLastBlock() {
    const blockContainer = document.getElementById('block-container');
    if (blockContainer!== null) {
      const lastBlock = blockContainer.lastElementChild;
      if (lastBlock) {
        blockContainer.removeChild(lastBlock);
      }
    }
  }

  saveInfo(name : string[], coloriesProduct: number[], grammCount: number[] ) {
    let priceGramm = [];
    for (let i = 0; i < coloriesProduct.length; i++) {
      priceGramm[i] = coloriesProduct[i] / 100
    }

    let sumColories = [];
    for (let i = 0; i < coloriesProduct.length; i++) {
      sumColories[i] = priceGramm[i] * grammCount[i]
    }

    let sumColoriesPorciesed = parseFloat((sumColories.reduce((total, num) => total + num, 0)).toFixed(2));
    let sumGrammCount = grammCount.reduce((total, num) => total + num, 0);
    let caloriesInHundreded = parseFloat(((sumColoriesPorciesed / sumGrammCount) * 100).toFixed(2));

    //Присвоить инпуты
    if(!Number.isNaN(sumColoriesPorciesed) && !Number.isNaN(caloriesInHundreded)){
      this.caloriesInHundred = caloriesInHundreded;
      this.sumColoriesPorcies = sumColoriesPorciesed;
  
      this.addProduct([this.products.length,this.foodName,this.caloriesInHundred])
      this.reportDataService.setDishesAdded(this.reportDataService.dishesAdded.getValue() + 1)
    }
  }
}