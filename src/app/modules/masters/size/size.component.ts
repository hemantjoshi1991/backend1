import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../shared/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { DbOpration } from '../../shared/utility/db-opration';
import {
  NoWhiteSpaceValidator,
  charFieldValidator,
} from '../../shared/validation/validation.validator';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NotificationService } from '../../shared/service/notification.service';


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  buttonText: string;
  dbOpt: DbOpration;
  objRows: any[] = [];
  objRow: any;

  @ViewChild('nav') elNav: any;

  formError = {
    name : ''
  }

  validationMessage = {
    name : {
      required : 'size id required',
      minlength : 'char cannt be less than 3',
      maxlength : 'char cannt be greather than 10',
      validCharField : 'only char required',
      noWhiteSpaceValidator : 'white space not allowed'
    }
  }

  constructor(
    private _http: HttpService,
    private _toastr: ToastrService,
    private _fb: FormBuilder,private _notificationService : NotificationService
  ) {}

  ngOnInit(): void {
    this.setFormState();
    this.getList();
  }

  setFormState() {
    this.buttonText = 'Add';
    this.dbOpt = DbOpration.create;
    this.addForm = this._fb.group({
      id: [0],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          charFieldValidator.validCharField,
          NoWhiteSpaceValidator.noWhiteSpaceValidator,
        ]),
      ],
    });
    this.addForm.valueChanges.subscribe(()=>{
      this.onValueChange();
    })
      
    
  }

  onValueChange(){

    if(!this.addForm){
      return;
    }
 for(const field of Object.keys(this.formError)){
   this.formError[field]='';

   const control = this.addForm.get(field);
   if(control && control.dirty && control.invalid){
    const message = this.validationMessage[field]
    for(const key of Object.keys(control.errors)){
      if(key != 'required'){
        this.formError[field] += message[key]+" ";
      }
      
    }
   }
 }
  }

  get ctrl() {
    return this.addForm.controls;
  }

  tabChange(event: any) {
    this.addForm.reset({
      id: 0,
      name: '',
    });
    this.buttonText = 'Add';
    this.dbOpt = DbOpration.create;
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }

    switch (this.dbOpt) {
      case DbOpration.create:
        this._http
          .post(
            environment.BASE_URL_PATH + 'SizeMaster/Save/',
            this.addForm.value
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              
              this._toastr.success('record save !!', 'Size Master');
              this.resetForm();
            } else {
              this._toastr.error(res.errors[0], 'Size Master');
            }
          });
        break;
      case DbOpration.update:
        this._http
          .post(
            environment.BASE_URL_PATH + 'SizeMaster/Update/',
            this.addForm.value
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              
              this._toastr.success('Record update !!', 'Size Master');
              this.resetForm();
            } else {
              this._toastr.error(res.errors[0], 'Size Master');
            }
          });
        break;
    }
  }

  getList() {
    this._http
      .get(environment.BASE_URL_PATH + 'SizeMaster/GetAll')
      .subscribe((res) => {
        
        if (res.isSuccess) {
          
          this.objRows = res.data;
        } else {
          this._toastr.error(res.errors[0], 'Size Master');
        }
      });
  }

  resetForm() {
    this.addForm.reset({
      id: 0,
      name: '',
    });
    this.buttonText = 'Add';
    this.dbOpt = DbOpration.create;
    this.getList();
    this.elNav.select('viewTab');
  }

  edit(id: number) {
    
    this.buttonText = 'Update';
    this.dbOpt = DbOpration.update;
    this.elNav.select('addTab');

    this.objRow = this.objRows.find((m) => m.id === id);
    this.addForm.patchValue(this.objRow);
    
  }

  VL_ID : any
  deleteById(id:number){
 this.VL_ID=id
 this._notificationService.deleteMessage(this.delete.bind(this))
  }

  delete() {
    let obj = {
      id:this.VL_ID
    };

    this._http.post(environment.BASE_URL_PATH + 'SizeMaster/Delete/', obj).subscribe((res) => {
        
      if (res.isSuccess) {
        // this._toastr.success('Record Deleted !!', 'Size Master');
   
      this.getList();
      } else {
        this._toastr.error(res.errors[0], 'Size Master');
      }
    });
  
  }


  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
  }

  cancleForm() {
    this.addForm.reset({
      id: 0,
      name: '',
    });
    this.buttonText = 'Add';
    this.dbOpt = DbOpration.create;
    this.elNav.select('viewTab');
  }
}
