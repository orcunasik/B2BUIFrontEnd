import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CustomerDecodeService {

  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor() { }


  getCustomerId():number{
    try {
      let decode = this.jwtHelper.decodeToken(localStorage.getItem("customerToken"));
      let customerId = Object.keys(decode).filter(p => p.endsWith("/nameidentifier"))[0];
      return +decode[customerId];
    } catch (error) {
      return 0;
    }
  }
  getCustomerName():string{
    let decode = this.jwtHelper.decodeToken(localStorage.getItem("customerToken"));
    let customerName = Object.keys(decode).filter(p => p.endsWith("/name"))[0];
    return decode[customerName];
  }
}
