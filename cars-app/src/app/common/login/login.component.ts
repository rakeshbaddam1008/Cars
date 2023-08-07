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
  constructor(private router: Router, public toaster: ToastrService,) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl('', Validators.required)
    })
  }


  routeToDashboard() {
    if (this.loginFormGroup.valid) {
      this.router.navigateByUrl('/dashboard')
    } else {
      this.toaster.warning('Please fill all the required Fields', 'Warning', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })

    }

  }

}