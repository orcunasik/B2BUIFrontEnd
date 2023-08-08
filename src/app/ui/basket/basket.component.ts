import { Component, OnInit } from '@angular/core';
import { BasketService } from './service/basket.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerDecodeService } from '../login/service/customer-decode.service';
import { BasketModel } from './model/basket-model';
import { OrderService } from '../order/service/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  baskets : BasketModel[] = [];
  customerId : number = 0;
  grandTotal : number = 0;

  constructor(
    private basketService : BasketService,
    private errorService : ErrorService,
    private toastr : ToastrService,
    private customerDecodeService : CustomerDecodeService,
    private orderService : OrderService
  ) { }

  ngOnInit(): void {
    this.getCustomerId();
  }

  getCustomerId(){
    this.customerId = this.customerDecodeService.getCustomerId();
    this.getList();
  }

  getList(){
    this.basketService.getList(this.customerId)
                              .subscribe({
                                next : (res:any) => {
                                  this.baskets = res.data;
                                  this.setTotal();
                                },
                                error : (err:any) => this.errorService.errorHandler(err)
                              });
  }

  setTotal(){
    this.grandTotal = 0;
    this.baskets.forEach(p => {
      this.grandTotal = this.grandTotal + p.total;
    });
  }

  createOrder(){
    this.orderService.add(this.customerId)
                        .subscribe({
                          next : (res : any) => {
                            this.toastr.success("Sipariş Başarıyla Oluşturuldu");
                            this.getList();
                          },
                          error : (err : any) => this.errorService.errorHandler(err)
                        });
  }

  delete(basket : BasketModel){
    this.basketService.delete(basket)
                        .subscribe({
                          next : (res : any) => {
                            this.toastr.warning(basket.productName + " Sepetten Silindi!");
                            this.getList();
                          },
                          error : (err : any) => this.errorService.errorHandler(err)
                        });
  }
}
