import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth : boolean = false;
  constructor(
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth();
  }

  logout(){
    
  }

}
