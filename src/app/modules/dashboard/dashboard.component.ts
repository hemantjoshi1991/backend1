import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Order:number
  CashOnDelivery:number
  Cancelled:number
  ShippingAmount:number
  objRows :any=[]
  
  orderStatusChart :any;

  constructor(private http : HttpService,private toastr : ToastrService) {
    
   }

  ngOnInit(): void {
    this.getlist();
    this.getOrderlist();
    this.getStatusOrderData();
  }

  getlist(){
    this.http.get(environment.BASE_URL_PATH+'PaymentMaster/GetReportNetFigure').subscribe({
      next:res=>{
        if(res.isSuccess){
          this.Order = res.data[0].orders;
          this.CashOnDelivery = res.data[0].cashOnDelivery;
          this.Cancelled = res.data[0].cancelled;
          this.ShippingAmount = res.data[0].shippingAmount

          
        }
        
      }
    })
  }

  getOrderlist(){
    this.http.get(environment.BASE_URL_PATH+'PaymentMaster/GetReportManageOrder').subscribe({
      next:res=>{
        if(res.isSuccess){
          this.objRows = res.data
          console.log("Order list",res.data)
        }
        
      }
    })
  }


 getStatusOrderData(){

  this.http.get(environment.BASE_URL_PATH+'PaymentMaster/GetChartOrderStatus').subscribe({
    next:res=>{
      if(res.isSuccess){
        // counts:1 date: "22-12-2019" orderStatus "Cancelled"
        let objOrderStatus = []
        let array = ["Date"]

        let allData = res.data;
        let allDate = allData.map((list)=> list.date).filter((value,index,self)=>self.indexOf(value)===index);
        let allOrderStatus = allData.map((list)=> list.orderStatus).filter((value,index,self)=>self.indexOf(value)===index);

        for(let status of allOrderStatus){
          array.push(status)
        }
        objOrderStatus.push(array);

        var setZero : any=0;
        for(let date of allDate){
          array =[];
          array.push(date)
         
          for(let status of allOrderStatus){
            array.push(setZero)
          }
            for(let i in allOrderStatus){
              for(let index in allData){
                if(allOrderStatus[i]=== allData[index].orderStatus && date === allData[index].date ){
                  array[ parseInt(i) +1 ] = allData[index].counts
                }
              }
            }
         
          objOrderStatus.push(array)

          
        }

        this.orderStatusChart = {
          chartType: 'ColumnChart',
          dataTable:objOrderStatus,
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



      }else{
        this.toastr.error(res.errors[0],"Dashboard")
      }
    }
  })


  // this.orderStatusChart = {
  //   chartType: 'ColumnChart',
  //   dataTable: [
  //   ["Year", "Sales", "Expenses"],
  //   ["100", 2.5, 3.8],
  //   ["200", 3, 1.8],
  //   ["300", 3, 4.3],
  //   ["400", 0.9, 2.3],
  //   ["500", 1.3, 3.6],
  //   ["600", 1.8, 2.8],
  //   ["700", 3.8, 2.8],
  //   ["800", 1.5, 2.8]
  //   ],
  //   options: {
  //   legend: { position: 'none' },
  //   bars: "vertical",
  //   vAxis: {
  //   format: "decimal"
  //   },
  //   height: 340,
  //   width: '100%',
  //   colors: ["#ff7f83", "#a5a5a5"],
  //   backgroundColor: 'transparent'
  //   },
  //   };
   
 }
 
}
