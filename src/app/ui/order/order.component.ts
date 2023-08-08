import { Component, OnInit } from '@angular/core';
import { OrderService } from './service/order.service';
import { CustomerDecodeService } from '../login/service/customer-decode.service';
import { ErrorService } from 'src/app/services/error.service';
import { OrderModel } from './model/order-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders : OrderModel[] = [];
  customerId : number = 0;
  filterText : string ="";

  constructor(
    private orderService : OrderService,
    private customerDecodeService : CustomerDecodeService,
    private errorService : ErrorService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.getCustomerId();
  }

  getCustomerId(){
    this.customerId = this.customerDecodeService.getCustomerId();
    this.getList();
  }

  getList(){
    this.orderService.getListByCustomerId(this.customerId)
      .subscribe({
            next : (res: any) => this.orders = res.data,
            error : (err : any) => this.errorService.errorHandler(err)                                
      })
  }

  delete(order : OrderModel){
    this.orderService.delete(order)
                        .subscribe({
                          next : (res : any) => {
                            this.toastr.warning(order.orderNumber + " Nolu Siparişiniz İptal Edildi!");
                            this.getList();
                          },
                          error : (err : any) => this.errorService.errorHandler(err)
                        });
  }

}
