import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { OrderModel } from '../model/order-model';
import { OrderDetailModel } from './model/order-detail-model';
import { OrderDetailService } from './service/order-detail.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderDetails : OrderDetailModel[] = [];;
  order : OrderModel = new OrderModel();
  orderId : number = 0;

  constructor(
    private activatedRoute : ActivatedRoute,
    private orderDetailService : OrderDetailService,
    private errorService : ErrorService,
    private orderService : OrderService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next : (res : any) => {
        this.orderId = res.id;
        this.getList();
        this.getOrder();
      }
    });
  }

  getOrder(){
    this.orderService.getById(this.orderId).subscribe({
      next : (res : any) => this.order = res.data,
      error : (err : any) => this.errorService.errorHandler(err)
    });
  }

  getList(){
    this.orderDetailService.getList(this.orderId).subscribe({
      next : (res : any) => this.orderDetails = res.data,
      error : (err : any) => this.errorService.errorHandler(err)
    });
  }
}
