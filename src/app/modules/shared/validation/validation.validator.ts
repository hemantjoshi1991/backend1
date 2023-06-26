import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class textFieldValidator{
    static validTextField(fc : FormControl){
     if(fc.value != undefined && fc.value != '' && fc.value != null){
        const regex = /^[0-9a-zA-Z ]+$/;
       if(regex.test(fc.value)){
        return null
       }else{
        return { validTextField : true};
       }
     }else{
        return null
     }

    }
}

export class numberFieldValidator{
  static validNumberField(fc : FormControl){
    if(fc.value != undefined && fc.value != '' && fc.value != null){
      const regex = /[0-9]+/; 
      if(regex.test(fc.value)){
        return null
      }else{
        return { validNumberField : true};
      }
    }else {
      return null
    }
  }
}

export class charFieldValidator{
    static validCharField(fc : FormControl){
        if(fc.value != undefined && fc.value != '' && fc.value != null){
          const regex = /^[a-zA-Z ]+$/;
          if(regex.test(fc.value)){
            return null
          }else{
            return {validCharField : true}
          }
        }else {
            return null
        }
    }
}

export class emailFieldValidator{
    static validMailField(fc : FormControl){
    if(fc.value != undefined && fc.value != '' && fc.value!= null){
     const regex = /^[a-zA-Z]+$/;
     if(regex.test(fc.value)){
        return null
     }else{
        return {validMailField : true}
     }
    }else {
        return null
    }
    }
}

export class NoWhiteSpaceValidator{
    static noWhiteSpaceValidator(fc :FormControl){
        if(fc.value != undefined && fc.value != "" && fc.value != null){
         const isWhiteSpace = (fc.value.toString().trim().length === 0)
         if(!isWhiteSpace){
            return null
         }else{
            return { noWhiteSpaceValidator: true }
         }
        }else{
        return null
        }
    }
}

// export function twoFieldValidator(controlName : string, matchingControlName : string){
//     return (_fg : FormGroup)=>{
//        const control = _fg.controls[controlName];
//        const matchControl = _fg.controls[matchingControlName];
//        if(matchControl.errors && !matchControl.errors['mustMatch']){
//         return ;
//        }
//        if(control.value !== matchControl.value){
//          matchControl.setErrors({ mustMatch : true})
//        }else{
//         matchControl.setErrors(null)
//        }
//     }
// }

export function twoFieldValidator(controlName : string, matchingControlName : string){
  return (ctrl : AbstractControl) : ValidationErrors | null=>{
     const control = ctrl.get(controlName);
     const matchControl = ctrl.get(matchingControlName);
     if(matchControl.errors && !matchControl.errors['mustMatch']){
      return null;
     }
     if(control.value !== matchControl.value){
       matchControl.setErrors({ mustMatch : true})
     }else{
      matchControl.setErrors(null)
     }
     return null
  }
}