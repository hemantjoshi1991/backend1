import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DbOpration } from '../../shared/utility/db-opration';
import { NoWhiteSpaceValidator, charFieldValidator } from '../../shared/validation/validation.validator';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  objForm : any;
  buttonText : string=""
  dbOperation : DbOpration;
  objRow : any;
  objRows : any[]=[];
  addedImagePath = 'assets/images/noimage.png';
  fileToUpload:any;
  listUpdate :any;

  formErrors = {
    name : '',
    title : '',
    isSave : '',
    link : ''
  }

  validationMessage = {
    name : {
      required : 'Name is required',
      minlength : 'Name cannot be less than 3 char small',
      maxlength : 'Name cannot be more than 10 char long',
      validCharField :'Only Char and space allowed',
      noWhiteSpaceValidator : 'Only space not allowed'
    },
    title : {
      required : 'Name is required',
      minlength : 'Name cannot be less than 3 char small',
      maxlength : 'Name cannot be more than 10 char long',
      validCharField :'Only Char and space allowed',
      noWhiteSpaceValidator : 'Only space not allowed'
    },
    isSave : {
      required : 'Name is required',
      minlength : 'Name cannot be less than 3 char small',
      maxlength : 'Name cannot be more than 10 char long',
      validCharField :'Only Char and space allowed',
      noWhiteSpaceValidator : 'Only space not allowed'
    },
    link : {
      required : 'Name is required',
      minlength : 'Name cannot be less than 3 char small',
      maxlength : 'Name cannot be more than 10 char long',
      validCharField :'Only Char and space allowed',
      noWhiteSpaceValidator : 'Only space not allowed'
    }
  }

  @ViewChild('nav') elNav:any;
  @ViewChild('file') elRef:ElementRef

  constructor(private _fb : FormBuilder,private http : HttpService,private toastr: ToastrService,private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.getList();
    this.setFormState();
  }

  setFormState(){
    this.dbOperation=DbOpration.create;
    this.buttonText="Add";
    this.objForm = this._fb.group({
      id:[0],
      name:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),charFieldValidator.validCharField,NoWhiteSpaceValidator.noWhiteSpaceValidator])],
      title:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),charFieldValidator.validCharField,NoWhiteSpaceValidator.noWhiteSpaceValidator])],
      link:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),charFieldValidator.validCharField,NoWhiteSpaceValidator.noWhiteSpaceValidator])],
      isSave:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10),charFieldValidator.validCharField,NoWhiteSpaceValidator.noWhiteSpaceValidator])]
    })
  }

  get ctrl(){
    return this.objForm.controls
  }

  getList(){
    this.http.get(environment.BASE_URL_PATH+'Category/GetAll').subscribe({
      next: res=>{
        if(res.isSuccess){
          this.objRows=res.data
        }
      }
    })
  }


  tabChange(event : any){
    this.objForm.reset({
      id:0,
      name:'',
      title:'',
      isSave:'',
      link:''
    })
    this.dbOperation=DbOpration.create;
    this.buttonText="Update"
  
  }


  

  onSubmit(){

    if(!this.objForm){
      return
    }

    if(this.dbOperation ==DbOpration.create && !this.fileToUpload){
      this.toastr.error('Please upload Image','Category Master')
      return
    }

    let formData = new FormData();
    formData.append("Id",this.objForm.value.id);
    formData.append("Name",this.objForm.value.name);
    formData.append("Title",this.objForm.value.title);
    formData.append("IsSave",this.objForm.value.isSave);
    formData.append("Link",this.objForm.value.link);
    formData.append("Image",this.fileToUpload,this.fileToUpload.name)
    switch(this.dbOperation){
      case DbOpration.create:
        this.http.postImage(environment.BASE_URL_PATH+'Category/Save/',formData).subscribe({
          next: res=>{
            if(res.isSuccess){
              this.toastr.success("Record created","Category Master");
              this.resetForm();
            }
          }
        })
        break;
        case DbOpration.update:
          this.http.postImage(environment.BASE_URL_PATH+'Category/Update/',formData).subscribe({
            next:res=>{
              if(res.isSuccess){
                this.toastr.success("Record Update","Category Master");
                this.resetForm();
              }
            }
          })
    }
  }

  onUpload(files:any){

    if(files.length===0){
      return
    }

    let type = files[0].type;
    if(type.match(/image\/*/)==null){
      this.toastr.error('please upload valid image','Category master');
      this.elRef.nativeElement.value="";
      this.addedImagePath='assets/images/noimage.png'
    }

   this.fileToUpload=files[0];
    // client side file read

    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = ()=>{
    this.addedImagePath = reader.result.toString();
    }

  }

  edit(id:number){
  this.dbOperation=DbOpration.update;
  this.buttonText="Update";
  this.elNav.select('addTab');

  this.objRow= this.objRows.find(m=>m.id==id);
  this.objForm.patchValue(this.objRow);
  this.addedImagePath=this.objRow.imagePath;
  }

  resetForm(){
    this.objForm.reset({
      id:[''],
      name:[''],
      title:[''],
      isSave:[''],
      link:['']
    })
    this.elRef.nativeElement.value="";
    this.addedImagePath= 'assets/images/noimage.png';
    this.dbOperation=DbOpration.create;
    this.buttonText="Add";
    this.getList();
    this.elNav.select('viewTab')
  }


  deleteById(id:number){
    this.listUpdate= id;
    this.notificationService.deleteMessage(this.delete.bind(this))
  }
  delete(){
  let obj ={
    id: this.listUpdate
  }
  this.http.post(environment.BASE_URL_PATH+'Category/Delete',obj).subscribe({
    next:res=>{
      if(res.isSuccess){
        this.getList();
      }
    }
  })
}

cancle(){
  this.objForm.reset({
    id:[''],
    name:[''],
    title:[''],
    isSave:[''],
    link:['']
  })
  this.elRef.nativeElement.value="";
  this.addedImagePath= 'assets/images/noimage.png';
  this.dbOperation=DbOpration.create;
  this.buttonText="Add";
  this.getList();
  this.elNav.select('viewTab')
}

}
