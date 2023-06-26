import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../shared/service/http.service';
import { DbOpration } from '../../shared/utility/db-opration';
import { twoFieldValidator } from '../../shared/validation/validation.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  dbOperation : DbOpration;
  buttonText : String="";
  objRows : any[]=[];
  addId : number=0
  isSubmitted:boolean=false


  constructor(private _fb: FormBuilder,private toastr : ToastrService,private route : ActivatedRoute,private http : HttpService,private router : Router) { 
    this.route.queryParams.subscribe(params  =>{
      this.addId=params['userType']
     
      

    })
  }

  ngOnInit(): void {
    this.getUserList();
    this.setFormState();

    if(this.addId && this.addId != null && this.addId>0){
      this.dbOperation=DbOpration.update;
      this.buttonText="Update";
      this.getUserById(this.addId)
    }
  }

  setFormState(){
    this.dbOperation=DbOpration.create;
    this.buttonText="Add";

    this.addForm=new FormGroup({
      id: new FormControl(0),
      firstName :new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])),
      lastName :new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])),
      userType :new FormControl('',Validators.required),
      email :new FormControl('',[Validators.required,Validators.email]),
      password :new FormControl('',Validators.compose([Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')])),
      matchPassword :new FormControl('',Validators.required)
    },twoFieldValidator('password','matchPassword')
    )
  }

  get ctrl(){
    return this.addForm.controls;
  }

  getUserById(id:number){
   
    this.http.get(environment.BASE_URL_PATH+'UserMaster/GetbyId/'+id).subscribe({
      next:res=>{
        if(res.isSuccess){
          
          this.addForm.patchValue(res.data);
        }else{
          this.toastr.error(res.errors[0],"Add-List")
        }
      }
    })
  }


  getUserList(){
    this.http.get(environment.BASE_URL_PATH+'UserType/GetAll').subscribe({
      next:res=>{
        if(res.isSuccess){
          this.objRows=res.data
        }else{
          this.toastr.error(res.errors[0],"Add-List")
        }
      }
    })
  }

  registration(){
  if(!this.addForm){
    return
  }
  this.isSubmitted=true;
  switch(this.dbOperation){
    case DbOpration.create :
      this.http.post(environment.BASE_URL_PATH+'',this.addForm.value).subscribe({
        next:res=>{
          if(res.isSuccess){
            this.toastr.success('record is Add successfully !!','Add-list')
            this.formReset()
          }else{
            this.toastr.error(res.errors[0],"Add-list")
          }
        }
      })
      break;
      case DbOpration.update :
        this.http.post(environment.BASE_URL_PATH+'',this.addForm.value).subscribe({
          next:res=>{
            if(res.isSuccess){
              this.toastr.success('recod is updated successfully !!','Add-list');
              this.formReset();
            }else{
              this.toastr.error(res.errors[0],"Add-list")
            }
          }
        })
  }
  }

  formReset(){
    this.addForm.reset();
    this.dbOperation=DbOpration.create;
    this.buttonText="Add";
    this.isSubmitted=false;

  }

  cancle(){
    this.formReset();
    this.router.navigate(['/users/list-user'])
  }

}
