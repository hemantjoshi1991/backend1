import { Component, Input, OnInit } from '@angular/core';
import * as feather from 'feather-icons'
@Component({
  selector: 'app-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss']
})
export class FeatherIconsComponent implements OnInit {

  @Input('icon') featherIcon :any;
  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    feather.replace()
  }

}
