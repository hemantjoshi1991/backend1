import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  objRows:any=[]
  constructor(private http : HttpService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getOrderData();
  }

  getOrderData(){
    this.http.get(environment.BASE_URL_PATH+'PaymentMaster/GetReportManageOrder').subscribe({
      next: res=>{
        if(res.isSuccess){
          this.objRows=res.data
        }else{
          this.toastr.error(res.errors[0],'Order')
        }
      }
    })
  }
}
