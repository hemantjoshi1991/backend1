import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/service/http.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  userDetails: any;
  userImage: string = "assets/images/user.png";
  firstName: string = "";
  lastName: string = "";
  fullName: string = "";
  emailId = "";
  addedImagePath :string = "assets/images/noimage.png";
  fileToUpload: any;

  @ViewChild('file') elRef: ElementRef;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userImage =
      (this.userDetails.imagePath == "" || this.userDetails.imagePath == null)
        ? 'assets/images/user.png'
        : environment.BASE_USERS_PATH + this.userDetails.imagePath;
    this.firstName = this.userDetails.firstName;
    this.lastName = this.userDetails.lastName;
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.emailId = this.userDetails.email;
  }

  upload(files: any) {
    if (files.length === 0) {
      return;
    }
    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this.toastr.error('Please upload valid image file', 'User profile');
      this.elRef.nativeElement.value = "";
      this.addedImagePath = 'assets/images/noimage.png';
    }
    this.fileToUpload = files[0];
    // read as client side
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.addedImagePath = reader.result.toString();
    };
  }


  changeImage() {
    if (!this.fileToUpload) {
      this.toastr.error('Please upload image file ', 'User Profile');
      return;
    }
    const formData = new FormData();
    formData.append('Id', this.userDetails.id);
    formData.append('Image', this.fileToUpload, this.fileToUpload.name);
    this.http.postImage(environment.BASE_URL_PATH + 'UserMaster/UpdateProfile/', formData).subscribe(res => {
      if (res.isSuccess) {
        this.toastr.success("Profile Image has been changed !!", "Profile Master");
        this.elRef.nativeElement.value = "";
        this.addedImagePath = "assets/images/noimage.png";
        this.fileToUpload = null;

        //

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "Are you  want to see this changes rightnow ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, rightnow!',
          cancelButtonText: 'No, keep it!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/auth/login']);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          
          }
        })

        //


      } else {
        this.toastr.error(res.errors[0], "BrandLogo Master");
      }
    });

  }

  tabChange(event: any) {
    
    this.addedImagePath = 'assets/images/noimage.png';
    this.fileToUpload=null
  }
}
