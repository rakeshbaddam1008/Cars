import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    var data = '';

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open('GET', 'http://localhost:8080/carizma/seller-vehicle-info');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVSUB3aWxsY294c3lzdGVtcy5jb20iLCJpYXQiOjE2OTI0NjA2NTYsImV4cCI6MTY5MjQ2MTU1Nn0.1I-sj7M73WDLTK4rpLDwLzDtz5k38phVJQphWjPL8-0'
    );

    var response = xhr.send(data);

    alert(response);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  onClickProfile() {
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
