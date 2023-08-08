import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './service/product-detail.service';
import { ProductDetailModel } from './model/product-detail-model';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from '../model/product-model';
import { ProductService } from '../service/product.service';
import { CustomerDecodeService } from '../../login/service/customer-decode.service';
import { BasketModel } from '../../basket/model/basket-model';
import { BasketService } from '../../basket/service/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  productDetails : ProductDetailModel[] = [];
  products : ProductModel[] = [];
  product : ProductModel = new ProductModel();
  isAuth : boolean =false;
  productId : number = 0;
  customerId: number = 0;
  quantity : number = 1;

  constructor(
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private productDetailService : ProductDetailService,
    private customerDecodeService : CustomerDecodeService,
    private basketService : BasketService,
    private toastr : ToastrService,
    private errorService : ErrorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe({
      next:(res:any) => {
        this.productId = res.id;
        this.getCustomerId();
        this.getProduct();
        this.productDetailService.getList(this.productId)
        .subscribe({
          next: (res:any) => this.productDetails = res.data,
          error : (err:any) => this.errorService.errorHandler(err)
        });
      }
    })
    this.isAuth = this.authService.isAuth();
  }

  getCustomerId(){
    this.customerId = this.customerDecodeService.getCustomerId();
  }

  getProduct(){
    this.productService.getList(this.customerId)
      .subscribe({
        next : (res:any) => {
          this.products = res.data;
          this.product = this.products.filter(p => p.id == this.productId)[0];
        },
        error : (err:any) => this.errorService.errorHandler(err)
      });
  }

  addBasket(){
    let model : BasketModel = new BasketModel();
    model.customerId = this.customerId;
    model.id = 0;
    model.price = this.product.discount > 0
                  ? this.product.price * (100-this.product.discount)/100
                  : this.product.price;
    model.quantity = this.quantity;
    model.productId = this.product.id;

    this.quantity = 1;

    this.basketService.add(model)
                      .subscribe({
                        next : (res :any) => this.toastr.success(this.product.name + " Sepete Eklendi"),
                        error : (err:any) => this.errorService.errorHandler(err)
                      });
  }
}
