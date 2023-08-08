import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketModel } from '../model/basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    @Inject("apiUrl") private apiUrl : string,
    private httpClient : HttpClient

  ) { }

  add(basket : BasketModel){
    let api = this.apiUrl + "Baskets/Add";
    return this.httpClient.post(api,basket);
  }

  getList(customerId : number){
    let api = this.apiUrl + "Baskets/GetListByCustomerId/" + customerId;
    return this.httpClient.get(api);
  }

  delete(basket : BasketModel){
    let api = this.apiUrl + "Baskets/Delete";
    return this.httpClient.delete(api,{body : basket});
  }
}
