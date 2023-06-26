import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/modules/shared/service/http.service';
import { NotificationService } from 'src/app/modules/shared/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  objRows: any[]=[]
  constructor(private http:HttpService,private toastr : ToastrService,private notificationService : NotificationService,private router : Router) { }

  ngOnInit(): void {
   this.getList();
  }

  getList(){
    this.http.get(environment.BASE_URL_PATH+'ProductMaster/GetAll').subscribe({
      next:res=>{
        if(res.isSuccess){
          this.objRows=res.data
        }
      }
    })
  }

  edit(id:number){
   this.router.navigate(['/products/sub-product/add-product'],{queryParams: {productId : id}})
  }

  deleteById(id:number){
    
    this.notificationService.deleteMessage(()=>{
      let obj ={
        id:id
      }
      this.http.post(environment.BASE_URL_PATH+'ProductMaster/Delete',obj).subscribe({
        next:res=>{
          if(res.isSuccess){
            this.getList();
          }
        }
      })
    })
  }
}
