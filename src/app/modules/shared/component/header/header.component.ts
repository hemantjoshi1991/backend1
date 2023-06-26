import { Component, OnInit } from '@angular/core';
import { CollaspeService } from '../../service/collaspe.service';
import { environment } from 'src/environments/environment';
import { Global } from '../../service/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userImage :string ="assets/images/user.png"
  constructor(public _collaspeService : CollaspeService) { }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userImage = (userDetails.imagePath == '' || userDetails.imagePath == null) ? "assets/images/user.png" : environment.BASE_USERS_PATH + userDetails.imagePath
  }
  collaspe(){
    this._collaspeService.openSidebar = !this._collaspeService.openSidebar
  }
}
