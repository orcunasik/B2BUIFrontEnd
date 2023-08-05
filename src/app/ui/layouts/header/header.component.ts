import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  isAuth : boolean = false;
  constructor(
    private authService : AuthService
  ) { }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuth();
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
  }

}
