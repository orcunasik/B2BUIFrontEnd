import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject("apiUrl") 
    private apiUrl : string,
    private httpClient : HttpClient
  ) { }

  isAuth(): boolean{
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }
}
