import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel } from '../model/login-model';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject("apiUrl") 
    private apiUrl : string,
    private httpClient : HttpClient,
    private router :Router,
    private errorService : ErrorService
  ) { }

  isAuth(): boolean{
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }
  login(loginForm : any){
    let api = this.apiUrl + "Auth/CustomerLogin";
    let model : LoginModel = new LoginModel();
    model.email = loginForm.value.email;
    model.password = loginForm.value.password;

    this.httpClient.post(api,model).subscribe((res:any)=>{
      localStorage.setItem("token",res.data.customerAccessToken)
      this.router.navigate(["/"]);
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
}
