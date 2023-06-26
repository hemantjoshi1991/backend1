import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DbOpration } from '../../shared/utility/db-opration';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/service/notification.service';
import { HttpService } from '../../shared/service/http.service';
import {
  NoWhiteSpaceValidator,
  charFieldValidator,
} from '../../shared/validation/validation.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.scss'],
})
export class UsertypeComponent implements OnInit,OnDestroy {
  objForm: any;
  dbOperation: DbOpration;
  buttonText: String;
  objRow: any;
  objRows: any[] = [];
  VL_ID: any;

  formErrors = {
    name: '',
  };

  validationMessage = {
    name: {
      required: 'User Type Field Required',
      minlength: 'Length cannot be less than One',
      maxlength: 'Length cannot be more than Ten',
      validCharField: 'Only Character accepted',
      noWhiteSpaceValidator: 'White Space Not Allowed',
    },
  };

  @ViewChild('nav') elNav: any;

  constructor(
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.setFormState();
    this.getList();
  }

  setFormState() {
    this.dbOperation = DbOpration.create;
    this.buttonText = 'Add';

    this.objForm = this._fb.group({
      id: [0],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(10),
          charFieldValidator.validCharField,
          NoWhiteSpaceValidator.noWhiteSpaceValidator,
        ]),
      ],
    });

    this.objForm.valueChanges.subscribe(() => {
      this.onChangeValue();
    });
  }

  get ctrl() {
    return this.objForm.controls;
  }

  onChangeValue() {
    if (!this.objForm) {
      return;
    }
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = this.objForm.get(field);
      if (control && control.touched && control.invalid) {
        let message = this.validationMessage[field];
        for (const key of Object.keys(control.errors)) {
          if (key != 'required') {
            this.formErrors[field] += message[key] + ' ';
          }
        }
      }
    }
  }

  getList() {
    this.http.get(environment.BASE_URL_PATH + 'UserType/GetAll').subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.objRows = res.data;
        }
      },
    });
  }

  tabChange(event: any) {
    this.objForm.reset({
      id: 0,
      name: '',
    });
    this.dbOperation = DbOpration.create;
    this.buttonText = 'Add';
  }

  onSubmit() {
    if (!this.objForm) {
      return;
    }

    switch (this.dbOperation) {
      case DbOpration.create:
        this.http
          .post(environment.BASE_URL_PATH + 'UserType/Save/', this.objForm.value)
          .subscribe({
            next: (res) => {
              let message = res.errors[0];
              if (res.isSuccess) {
                this._notificationService.successMessage();
                this.getList();
                this.resetForm();
              } else {
                this._notificationService.errorMessage(message);
              }
            },
          });
        break;
      case DbOpration.update:
        this.http
          .post(environment.BASE_URL_PATH + 'UserType/Update/', this.objForm.value)
          .subscribe({
            next: (res) => {
              let message = res.errors[0];
              if (res.isSuccess) {
                this._notificationService.successMessage();
                this.getList();
                this.resetForm();
              } else {
                this._notificationService.errorMessage(message);
              }
            },
          });
    }
  }

  editById(id:number){
   this.dbOperation=DbOpration.update;
   this.buttonText="Update";
   this.elNav.select("addTab");
   this.objRow=this.objRows.find(m=>m.id==id)

   this.objForm.patchValue(this.objRow)
  }

  deleteById(id:number){
  this.VL_ID=id
  this._notificationService.deleteMessage(this.delete.bind(this))
  }
  delete(){
    let obj = {
      id : this.VL_ID
    }
    this.http.post(environment.BASE_URL_PATH+'UserType/Delete/', obj).subscribe({
      next:res=>{
        if(res.isSuccess){
          this.getList();
        }
      }
    })
  }

  ngOnDestroy(){
    this.objRow = null;
    this.objRows = null;
  }


  resetForm() {
    this.objForm.reset({
      id: 0,
      name: '',
    });
    this.dbOperation = DbOpration.create;
    this.buttonText = 'Add';
    this.elNav.select('viewTab');
  }
  cancleForm() {
    this.objForm.reset({
      id: 0,
      name: '',
    });
    this.dbOperation = DbOpration.create;
    this.buttonText = 'Add';
    this.elNav.select("viewTab")
  }
}
