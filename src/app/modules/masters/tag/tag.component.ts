import { Component, OnInit, ViewChild } from '@angular/core';
import { DbOpration } from '../../shared/utility/db-opration';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../shared/service/http.service';
import {
  NoWhiteSpaceValidator,
  charFieldValidator,
} from '../../shared/validation/validation.validator';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  // commonForm
  objForm: any;
  dbOpration: DbOpration;
  buttonText: string;
  objRow: any;
  objRows: any[] = [];

  @ViewChild('nav') elRef: any;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private http: HttpService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.setFormState();
    this.getList();
  }

  formErrors = {
    name: '',
  };

  validationMessage = {
    name: {
      required: 'tag field required',
      minlength: 'char cannot be less than 3',
      maxlength: 'char cannot be larger than 10',
      validCharField: 'only character accept',
      noWhiteSpaceValidator: 'no white sapce accept',
    },
  };

  setFormState() {
    this.dbOpration = DbOpration.create;
    this.buttonText = 'Add';

    this.objForm = this._fb.group({
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

    this.objForm.valueChanges.subscribe(() => {
      this.onValueChange();
    });
  }

  get ctrl() {
    return this.objForm.controls;
  }

  onValueChange() {
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
    this.http
      .get(environment.BASE_URL_PATH + 'TagMaster/GetAll')
      .subscribe((res) => {
        if (res.isSuccess) {
          debugger;
          this.objRows = res.data;
        } else {
          this._toastr.error(res.errors[0], 'Tags Master');
        }
      });
  }

  resetForm() {
    this.objForm.reset({
      id: 0,
      name: '',
    });
    this.dbOpration = DbOpration.create;
    this.buttonText = 'Add';
    this.elRef.select('viewTab');
    this.getList();
  }

  tabChange(event: any) {
    console.log('event', event);
    this.objForm.reset({
      id: 0,
      name: '',
    });
    this.dbOpration = DbOpration.create;
    this.buttonText = 'Add';
  }

  onSubmit() {
    if (!this.objForm) {
      return;
    }
    switch (this.dbOpration) {
      case DbOpration.create:
        this.http
          .post(
            environment.BASE_URL_PATH + 'TagMaster/Save/',
            this.objForm.value
          )
          .subscribe((res) => {
            let message = res.errors[0];
            if (res.isSuccess) {
              // this._toastr.success('Record create',"Tag Master")
              this._notificationService.successMessage();
              this.resetForm();
            } else {
              // this._toastr.error(res.errors[0],"Tag Master")
              this._notificationService.errorMessage(message);
            }
          });
        break;

      case DbOpration.update:
        this.http
          .post(
            environment.BASE_URL_PATH + 'TagMaster/Update/',
            this.objForm.value
          )
          .subscribe((res) => {
            let message = res.errors[0];
            if (res.isSuccess) {
              // this._toastr.success('Record Update', "Tag Master")
              this._notificationService.successMessage();
              this.resetForm();
            } else {
              // this._toastr.error(res.errors[0],"Tag Master")
              this._notificationService.errorMessage(message);
            }
          });
        break;
    }
  }

  edit(id: number) {
    this.dbOpration = DbOpration.update;
    this.buttonText = 'Update';
    this.elRef.select('addTab');

    this.objRow = this.objRows.find((m) => m.id === id);
    this.objForm.patchValue(this.objRow);
  }

  //

  VL_ID: any;
  deleteById(id: number) {
    this.VL_ID = id;
    this._notificationService.deleteMessage(this.delete.bind(this));
  }

  delete() {
    let obj = {
      id: this.VL_ID,
    };
    this.http
      .post(environment.BASE_URL_PATH + 'TagMaster/Delete/', obj)
      .subscribe({
        next: (res) => {
          let message = res.errors[0];
          if (res.isSuccess) {
            this.getList();
          } else {
            this._notificationService.errorMessage(message);
          }
        },
      });
  }

  ngOnDestroy(){
    this.objRow = null;
    this.objRows = null;
  }

  cancle() {
    console.log('event', event);
    this.objForm.reset({
      id: 0,
      name: '',
    });
    this.dbOpration = DbOpration.create;
    this.buttonText = 'Add';
    this.elRef.select('viewTab');
  }
}
