import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { ProductModel } from './model/product-model';
import { ErrorService } from 'src/app/services/error.service';
import { CustomerDecodeService } from '../login/service/customer-decode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products : ProductModel[] = [];
  customerId : number = 0;
  filterText : string ="";
  constructor(
    private productService : ProductService,
    private errorService : ErrorService,
    private customerDecodeService : CustomerDecodeService
  ) { }

  ngOnInit(): void {
    this.getCustomerId();
    this.getList();
  }

  getCustomerId(){
    this.customerId = this.customerDecodeService.getCustomerId();
  }

  getList(){
    this.productService.getList(this.customerId)
    .subscribe({
      next: (res:any) => this.products = res.data,
      error: (err:any) => this.errorService.errorHandler(err)

    });
  }

}
