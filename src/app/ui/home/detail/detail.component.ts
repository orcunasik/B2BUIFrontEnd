import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './service/product-detail.service';
import { ProductDetailModel } from './model/product-detail-model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  productDetails : ProductDetailModel[] = [];
  isAuth : boolean =false;
  productId : number = 0;

  constructor(
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
    private productDetailService : ProductDetailService,
    private errorService : ErrorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe({
      next:(res:any) => {
        this.productId = res.id;
        this.productDetailService.getList(this.productId)
        .subscribe({
          next: (res:any) => this.productDetails = res.data,
          error : (err:any) => this.errorService.errorHandler(err)
        });
      }
    })
    this.isAuth = this.authService.isAuth();
  }

}
