import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DbOpration } from '../../shared/utility/db-opration';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/service/http.service';
import { NotificationService } from '../../shared/service/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NoWhiteSpaceValidator, charFieldValidator } from '../../shared/validation/validation.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit,OnDestroy {

  objForm:any;
  dbOperation:DbOpration;
  buttonText:string="";
  objRow:any;
  objRows:any[]=[];
  VL_ID:any

  formErrors ={
    name:'',
    code:''
  }

  validationMessage = {
    name : {
      required : "Name is required",
      minlength: "Name cannot be less than 3 char small",
      maxlength: "Name cannot be more than 10 char long",
      validCharField: "only character and space accepted",
      noWhiteSpaceValidator: "only white sapace not allowed"
    },
    code : {
      required : "Code is required",
      minlength: "Code cannot be less than 3 char small",
      maxlength: "Code cannot be more than 10 char long",
      noWhiteSpaceValidator: "only white sapace not allowed"
    }
  }

  constructor(private _fb : FormBuilder,private http : HttpService,private _notificationService: NotificationService,private _toastr : ToastrService) { }

  @ViewChild('nav') elNav :any

  ngOnInit(): void {
    this.setFormState();
    this.getList();
  }

  setFormState(){
    this.dbOperation=DbOpration.create;
    this.buttonText="Add";
    this.objForm = this._fb.group({
      id: [0],
      name: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),charFieldValidator.validCharField,NoWhiteSpaceValidator.noWhiteSpaceValidator])],
      code: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),NoWhiteSpaceValidator.noWhiteSpaceValidator])]
    })
    this.objForm.valueChanges.subscribe(()=>{
      this.onValueChange()
    })
  }

  get ctrl(){
    return this.objForm.controls
  }

  getList(){
    this.http.get(environment.BASE_URL_PATH+'ColorMaster/GetAll').subscribe({
      next: res=>{
        if(res.isSuccess){
          this.objRows=res.data

        }
      }
    })
  }

  onValueChange(){
    for(const field of Object.keys(this.formErrors)){
      this.formErrors[field]=''
      const control = this.objForm.get(field)
      if(control && control.dirty && control.invalid){
        let message = this.validationMessage[field]
        for(const key of Object.keys(control.errors)){
          if(key != 'required'){
            this.formErrors[field] += message[key]+' / '
          }
        }
      }
    }
  }

  tabChange(event : any){
   this.objForm.reset({
    id:0,
    name:"",
    code:""
   })
   this.dbOperation=DbOpration.create;
   this.buttonText="Add"
  }

  resetForm(){
    this.objForm.reset({
      id:0,
      name:"",
      code:""
     })
     this.dbOperation=DbOpration.create;
     this.buttonText="Add"
     this.getList();
     this.elNav.select("viewTab")
  }

  onSubmit(){
   if(!this.objForm){
    return
   }
   switch(this.dbOperation){
    case DbOpration.create:
      this.http.post(environment.BASE_URL_PATH+'ColorMaster/Save/',this.objForm.value).subscribe({
        next: res=>{
          if(res.isSuccess){
            this._notificationService.successMessage();
            this.resetForm();
          }else{
            this._toastr.error(res.errors[0],"Color Master")
          }
        },
        error:err=>{
          let message = "Not Update"
          this._notificationService.errorMessage(message)
        }
      })
      break;

      case DbOpration.update :
        this.http.post(environment.BASE_URL_PATH+'ColorMaster/Update',this.objForm.value).subscribe({
          next: res=>{
            if(res.isSuccess){
              this._notificationService.successMessage();
              this.resetForm();
            }else{
              this._toastr.error(res.errors[0],"Color Master")
            }
          },
          error:err=>{
            let message = "Not Create"
            this._notificationService.errorMessage(message)
          }
        })

   }
  }

  cancle(){
    this.objForm.reset({
      id:0,
      name:"",
      code:""
     })
     this.dbOperation=DbOpration.create;
     this.buttonText="Add"
     this.elNav.select("viewTab")

  }

  editById(id:number){
  this.dbOperation=DbOpration.update;
  this.buttonText="Update";
  this.elNav.select('addTab');
  this.objRow=this.objRows.find(m=> m.id ==id);
  this.objForm.patchValue(this.objRow)
  }

  deleteById(id:number){
    this.VL_ID=id;
    this._notificationService.deleteMessage(this.delete.bind(this))
  }
  delete(){
  let obj ={
    id:this.VL_ID
  }
  this.http.post(environment.BASE_URL_PATH+'ColorMaster/Delete/', obj).subscribe({
    next : res=>{
      if(res.isSuccess){
        this.getList();
      }
    },
    error:err=>{
      let message=err.errors[0];
      this._notificationService.errorMessage(message)
    }
  })
  }

  ngOnDestroy(){
    this.objRow=null;
    this.objRows=null;
  }

}
