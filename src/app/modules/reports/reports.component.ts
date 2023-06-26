import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private http : HttpService,private toastr : ToastrService) { }
  orderStatusChart : any;
  ngOnInit(): void {
    this.getOrderStatusData();
  }

  getOrderStatusData(){
    this.http.get(environment.BASE_URL_PATH+"PaymentMaster/GetChartOrderStatus").subscribe({
      next:res=>{
        if(res.isSuccess){
          let objOrderData = [];
          let array = ["Date"];
          let allData = res.data;

          let allDates = allData.map(list=>list.date).filter((value,index,self)=>self.indexOf(value)===index);
          let allOrderStatus = allData.map(list=>list.orderStatus).filter((value,index,self)=>self.indexOf(value)===index)

          for(let status of allOrderStatus){
            array.push(status)
          }
          objOrderData.push(array)
          
          var setZero : any = 0;
          for(let date of allDates){
            array = [];
            array.push(date);
            for(let status of allOrderStatus){
              array.push(setZero)
            }
            for(let i in allOrderStatus){
              for(let index in allData ){
                if(allOrderStatus[i]===allData[index].orderStatus && date === allData[index].date){
                  array[parseInt(i)+1]= allData[index].counts
                }
              }
            }
            objOrderData.push(array)
            
          }

          this.orderStatusChart = {
            chartType: 'LineChart',
            dataTable:objOrderData,
            options: {
            legend: { position: 'none' },
            bars: "vertical",
            vAxis: {
            format: "decimal"
            },
            height: 340,
            width: '100%',
            colors: ["#ff7f83", "#a5a5a5"],
            backgroundColor: 'transparent'
            },
            };
          //debugger
        }else {
          this.toastr.error(res.errors[0],"Reports")
        }
      }
    })
  }

}
