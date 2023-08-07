import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel } from '../model/login-model';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject("apiUrl") private apiUrl : string,
    private httpClient : HttpClient,
    private router :Router,
    private errorService : ErrorService,
    private toastr : ToastrService,
  ) { }

  isAuth(): boolean{
    if(localStorage.getItem("customerToken")){
      return true;
    }
    return false;
  }
  login(loginForm : any){
    const api = this.apiUrl + "Auth/CustomerLogin";
    let model : LoginModel = new LoginModel();
    model.email = loginForm.value.email;
    model.password = loginForm.value.password;

    this.httpClient.post(api, model).pipe(
      map((res: any) => {
        localStorage.setItem("customerToken", res.data.customerAccessToken);
        this.router.navigate(["/"]);
        this.toastr.success("Giriş Başarılı");
      }),
      catchError((err) => {
        this.errorService.errorHandler(err);
        return throwError(() => err);
      })
    ).subscribe();
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
    this.toastr.info("Çıkış Başarılı");
  }
}
