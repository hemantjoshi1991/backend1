import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../shared/service/http.service';
import {  Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
 
  objRows : any[]=[]
  constructor(private toastr : ToastrService,private http: HttpService,private router:Router,private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.http.get(environment.BASE_URL_PATH+'UserMaster/GetAll').subscribe({
      next: res=>{
        if(res.isSuccess){
          this.objRows=res.data
        }else{
          this.toastr.error(res.errors[0],"List User")
        }
      }
    })
  }

  editById(id:number){
    this.router.navigate(['/users/add-user'],{queryParams : {userType: id}})
    
  }

  listUpdate: any;
  deleteById(id:number){
    this.listUpdate=id;
    this.notificationService.deleteMessage(this.delete.bind(this))
  }
  delete(){
    let obj = {
      id : this.listUpdate
    }
    this.http.post(environment.BASE_URL_PATH+'UserMaster/GetAll',obj).subscribe({
      next: res=>{
        if(res.isSuccess){
          this.getList();
        }
      }
    })
  }
}
