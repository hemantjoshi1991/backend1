import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DbOpration } from '../../shared/utility/db-opration';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoWhiteSpaceValidator, charFieldValidator } from '../../shared/validation/validation.validator';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/service/http.service';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-brandlogo',
  templateUrl: './brandlogo.component.html',
  styleUrls: ['./brandlogo.component.scss']
})
export class BrandlogoComponent implements OnInit {

  objForm : any;
  dbOperation: DbOpration;
  buttonText: string = "";
  objRow: any;
  objRows: any[]=[];
  VL_Id:any;
  addedImagePath = "assets/images/noimage.png";
  fileToUpload: any;

  formErrors = {
    name :''
  }

  validationMessage = {
    name : {
      required : "Name is required",
      minlength : "Name cannot be less than 3 char",
      maxlength : "Name cannot be more than 10 char long",
      validCharField : "Only character and space allowed",
      noWhiteSpaceValidator : "only white space not allowed"
      
    }
  }

  @ViewChild('nav') elNav: any;
  @ViewChild('file')  files : ElementRef;
  constructor(private _fb : FormBuilder,private http : HttpService,private toastr: ToastrService,private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.setFormState();
    this.getList();
  }

  setFormState(){
    this.dbOperation = DbOpration.create;
    this.buttonText = "Add"

    this.objForm= this._fb.group({
      id : [0],
      name : ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),charFieldValidator.validCharField,NoWhiteSpaceValidator.noWhiteSpaceValidator])]
    })

    this.objForm.valueChanges.subscribe(()=>{
      this.onValueChange()
    })
  }

  onValueChange(){
   
    if(!this.objForm){
      return
    }

    for(const field of Object.keys(this.formErrors)){
      this.formErrors[field]=""

      const control = this.objForm.get(field);
      if(control && control.touched && control.invalid){
        let message = this.validationMessage[field]
        for(const key of Object.keys(control.errors)){
          if(key != 'required'){
            this.formErrors[field] += message[key]+" "
          }
        }
      }
    }

  }

  get ctrl(){
    return this.objForm.controls;
  }

  getList(){
    this.http.get(environment.BASE_URL_PATH+'BrandLogo/GetAll').subscribe({
      next : res=>{
        if(res.isSuccess){
          this.objRows=res.data;
        }
      }
    })
  }

  uploadImage(files : any){
    if(files.length ===0){
      return;
    }
    const type = files[0].type;
    if(type.match(/image\/*/)== null){
   this.toastr.error('please upload valid image','Brand logo Image');
   this.files.nativeElement.value=""
   this.addedImagePath = "assets/images/noimage.png";
    }

    this.fileToUpload =files[0];
    // file read
    let reader = new FileReader();
     reader.readAsDataURL(files[0])
     reader.onload = ()=>{
      this.addedImagePath = reader.result.toString()
     }
  }

  onSubmit(){
   if(!this.objForm){
    return 
   }
   if(this.dbOperation ==DbOpration.create && !this.fileToUpload){
    this.toastr.error('please upload image',"Brand Logo Master")
    return;
   }
   const formData = new FormData();
     formData.append("Id",this.objForm.value.id);
     formData.append("Name",this.objForm.value.name);
     formData.append("Image",this.fileToUpload,this.fileToUpload.name)  

   switch(this.dbOperation){
    case DbOpration.create :
      this.http.postImage(environment.BASE_URL_PATH+'BrandLogo/Save/', formData).subscribe({
        next: res=>{
          if(res.isSuccess){
            this.toastr.success('record created','BrandLogo Master');
            this.resetForm();
          }else{
            this.toastr.error(res.errors[0],"BrandLogo Master")
          }
        }
      })
      break;
      case DbOpration.update :
        this.http.postImage(environment.BASE_URL_PATH+'BrandLogo/Update/',formData).subscribe({
          next: res=>{
            if(res.isSuccess){
              this.toastr.success("record updated",'BrandLogo Master');
              this.resetForm();
            }else{
              this.toastr.error(res.errors[0],"BrandLogo Master")
            }
          }
        })
   }
  }

  resetForm(){
  this.objForm.reset({
    id : 0,
    name : ''
  })
  this.dbOperation= DbOpration.create;
  this.buttonText= "Add";
  this.files.nativeElement.value=""
   this.addedImagePath = "assets/images/noimage.png";
  this.getList();
  this.elNav.select('viewTab')
  }

  editById(id:number){
   this.dbOperation=DbOpration.update;
   this.buttonText="Update";
   this.elNav.select('addTab')

   this.objRow = this.objRows.find(m=> m.id ==id);

   this.objForm.patchValue(this.objForm)
   this.addedImagePath= this.objRow.imagePath
  }

  deleteById(id:number){
    this.VL_Id=id
    this.notificationService.deleteMessage(this.delete.bind(this))
  }
  delete(){
    let obj ={
      id : this.VL_Id
    }
    this.http.post(environment.BASE_URL_PATH+'BrandLogo/Delete/', obj).subscribe({
      next: res=>{
        if(res.isSuccess){
          this.getList();
        }else{
          this.toastr.error(res.errors[0],"BrandLogo Master")
        }
      }
    })
  }

  tabChange(event:any){
    this.objForm.reset({
      id : 0,
      name : ''
    })
    this.dbOperation= DbOpration.create;
    this.buttonText= "Add";
    this.files.nativeElement.value=""
   this.addedImagePath = "assets/images/noimage.png";
  }

  cancle(){
    this.objForm.reset({
      id : 0,
      name : ''
    })
    this.dbOperation= DbOpration.create;
    this.buttonText= "Add";
    this.files.nativeElement.value=""
   this.addedImagePath = "assets/images/noimage.png";
   this.elNav.select("viewTab");
  }

}
