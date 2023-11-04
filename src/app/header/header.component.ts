import { Component } from '@angular/core';
import { AuthService } from '../shared utilities/services/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authService: AuthService) {
    
  }
}
