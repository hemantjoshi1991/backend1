import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { twoFieldValidator } from '../../shared/validation/validation.validator';
import { HttpService } from '../../shared/service/http.service';
import { Global } from '../../shared/service/global';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  @ViewChild('nav') eref : any

  loginForm : FormGroup
  registrationForm : FormGroup
  loginDetails : any
  isSubmitted : boolean = false
  constructor(private fb :FormBuilder,private _toastr : ToastrService,private _http : HttpService,private authService : AuthService) { }

  ngOnInit() {
    this.setLoginForm()
    this.setRegistrationForm()
  }
   setLoginForm(){
    this.loginForm = this.fb.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
   }

  //  setRegistrationForm(){
  //   this.registrationForm = this.fb.group({
  //     firstName : ['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])],
  //     lastName : ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
  //     email : ['',Validators.compose([Validators.required,Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$')])],
  //     userTypeId : [1],
  //     password : ['',Validators.compose([Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')])],
  //     matchPassword : ['',Validators.compose([Validators.required])]
  //   },
  //   {
  //     validators : twoFieldValidator('password','matchPassword')
  //   }
  //   )
  //  }

  setRegistrationForm(){
    this.registrationForm = new FormGroup({
      firstName : new FormControl ('',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])),
      lastName :  new FormControl ('',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])),
      email :new FormControl ('',Validators.compose([Validators.required,Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$')])),
      userTypeId :new FormControl (1),
      password :new FormControl ('',Validators.compose([Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')])),
      matchPassword :new FormControl ('',Validators.compose([Validators.required]))
    },twoFieldValidator('password','matchPassword')
    
    )
   }

   get ctrl(){
    return this.registrationForm.controls
   }

   login(){
    
     if(this.loginForm.get('userName').value === ''){
      this._toastr.error('Username Required','Login')
     }else if(this.loginForm.get('password').value === ''){
      this._toastr.error('Password Required','Login')
     }else{
      if(this.loginForm.valid){
        
        let obj = this.loginForm.value
        this._http.post(Global.BASE_URL_PATH+"UserMaster/login/", obj).subscribe(res => {
          this.loginDetails = res
          console.log("loginDetails :" + this.loginDetails)
          if(res.isSuccess){
            this.authService.authLogin(res.data);
            this.loginForm.reset();
          }else{
            this._toastr.error(res.errors[0],'login')
          }
        } )
      }
     }
   }

   registration(data : any){
    this.isSubmitted = true
    if(this.registrationForm.invalid){
      return
    }

    this._http.post(Global.BASE_URL_PATH+'UserMaster/Save/', data.value).subscribe(res => {
      if(res.isSuccess){
       this._toastr.success("registration is Succesfully !!!","registration")
       this.registrationForm.reset({
        firstName : [''],
        lastName : [''],
        email : [''],
        userTypeId : ['1'],
        password : ['']
       })
       this.isSubmitted = false
       this.eref.select('loginTab')
      }else{
        this._toastr.error(res.errors[0],"registration")
      }
      
    }) 
   } 

}
