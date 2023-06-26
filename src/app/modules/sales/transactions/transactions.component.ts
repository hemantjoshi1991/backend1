import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
 objRows:any=[]
  constructor(private http : HttpService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getTransactionData();
  }

  getTransactionData(){
    this.http.get(environment.BASE_URL_PATH+'PaymentMaster/GetReportTransactionDetails').subscribe({
      next: res=>{
        if(res.isSuccess){
          this.objRows = res.data
        }else {
          this.toastr.error(res.errors[0],"Transaction")
        }
      }
    })
  }
}
