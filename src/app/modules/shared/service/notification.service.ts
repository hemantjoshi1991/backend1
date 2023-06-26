import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { 

  }

  successMessage(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your record has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  errorMessage(message : any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }

  deleteMessage(data){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
         data();
        Swal.fire(
          'Deleted!',
          'Your Record has been deleted.',
          'success'
        )
      }
    })
  }
}
