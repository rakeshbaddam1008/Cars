import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/AuthService';
import { TokenStorageService } from 'src/app/services/TokenStorageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //   form: any = {
  //   username: null,
  //   password: null
  // };

  loginFormGroup: FormGroup = new FormGroup({});
  logintemplate: boolean = true;
  signupFormGroup: FormGroup = new FormGroup({});
  signuptemplate: boolean = false;
  passwordFormGroup: FormGroup = new FormGroup({});
  passwordtemplate: boolean = false;
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: any;
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  constructor(
    private router: Router,
    public toaster: ToastrService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.signupFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.passwordRegex),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
    this.passwordFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  signup1() {
    let username = this.signupFormGroup.controls['email'].value;
    let pwd = this.signupFormGroup.controls['password'].value;
    let confirmPassword =
      this.signupFormGroup.controls['confirmPassword'].value;
    if (pwd != confirmPassword) {
      alert('Password mismatch');
    }

    this.authService.register(username, pwd).subscribe(
      (data) => {
        console.log(data);
        this.toaster.warning(
          'Sign up succesfull, proceed to login.',
          'Success',
          {
            timeOut: 4000,
            positionClass: 'toast-top-right',
            closeButton: true,
          }
        );
        this.logintemplate = true;
        this.signuptemplate = false;
        this.passwordtemplate = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.toaster.warning(
          'Error occured during sign-up, please try later.',
          'Warning',
          {
            timeOut: 4000,
            positionClass: 'toast-top-right',
            closeButton: true,
          }
        );
      }
    );
  }

  routeToDashboard() {
    if (this.loginFormGroup.valid) {
      let username = this.loginFormGroup.controls['email'].value;
      let pwd = this.loginFormGroup.controls['password'].value;
      this.authService.login(username, pwd).subscribe(
        (data) => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveRefreshToken(data.token);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.toaster.warning('Error occured during Login', 'Warning', {
            timeOut: 4000,
            positionClass: 'toast-top-right',
            closeButton: true,
          });
        }
      );
    } else {
      this.toaster.warning('Please fill all the required Fields', 'Warning', {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        closeButton: true,
      });
    }
  }

  toggleBetweenLoginPages(event: string) {
    if (event === 'login') {
      this.logintemplate = true;
      this.signuptemplate = false;
      this.passwordtemplate = false;
    } else if (event === 'signUp') {
      this.logintemplate = false;
      this.signuptemplate = true;
      this.passwordtemplate = false;
    } else if (event === 'forgetPassword') {
      this.logintemplate = false;
      this.signuptemplate = false;
      this.passwordtemplate = true;
    }
  }
}
