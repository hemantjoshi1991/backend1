import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  objRows:any=[]
  constructor(private http : HttpService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getInvoiceData();
  }
  getInvoiceData(){
    this.http.get(environment.BASE_URL_PATH+'PaymentMaster/GetReportInvoiceList').subscribe({
      next: res=>{
        if(res.isSuccess){
          this.objRows=res.data
        }else{
          this.toastr.error(res.errors[0],"Invoice")
        }
      }
    })
  }

}
