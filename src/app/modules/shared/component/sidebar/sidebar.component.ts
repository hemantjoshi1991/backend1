import { Component, OnInit } from '@angular/core';
import { Global } from '../../service/global';
import { Menu } from '../../service/menu.interface';
import { MenuService } from '../../service/menu.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userImage :string ="assets/images/user.png";
  logoImage : string = "assets/images/logo.png";
  fullName : string= "";
  email : string= "";
  menuItems : Menu[] = []
  constructor(private _menuService : MenuService,private http : HttpService) { 

  }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.fullName = `${userDetails.firstName} ${userDetails.lastName}`;
    this.email = `${userDetails.email}`
    
  
    this.userImage= (userDetails.imagePath == "" || userDetails.imagePath == null) ? "assets/images/user.png" : environment.BASE_USERS_PATH + userDetails.imagePath;
    this.menuItems =this._menuService.menu
  }

  toggleNavActive(menuItem : Menu){
    menuItem.active = !menuItem.active
  }

}
