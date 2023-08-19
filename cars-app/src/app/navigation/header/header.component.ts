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

  ngOnInit(): void {}

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
