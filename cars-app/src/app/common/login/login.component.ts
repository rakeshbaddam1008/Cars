import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup: FormGroup = new FormGroup({})
  logintemplate: boolean = true;
  signupFormGroup: FormGroup = new FormGroup({})
  signuptemplate:boolean = false;
  passwordFormGroup: FormGroup = new FormGroup({})
  passwordtemplate: boolean = false;
  constructor(private router: Router, public toaster: ToastrService,) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl('', Validators.required)
    })
    this.signupFormGroup = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
    this.passwordFormGroup = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      )
    })
  }


  routeToDashboard() {
    if (this.loginFormGroup.valid) {
      this.router.navigateByUrl('/dashboard')
    } else {
      this.toaster.warning('Please fill all the required Fields', 'Warning', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })

    }

  }

  toggleBetweenLoginPages(event: string) {
    if(event === 'login') {
      this.logintemplate = true;
      this.signuptemplate = false;
      this.passwordtemplate = false;
    } else if(event === 'signUp') {
      this.logintemplate = false;
      this.signuptemplate = true;
      this.passwordtemplate = false;
    }
    else if(event === 'forgetPassword') {
      this.logintemplate = false;
      this.signuptemplate = false;
      this.passwordtemplate = true;
    }
  }

}