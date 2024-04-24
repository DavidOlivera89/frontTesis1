import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {

  private auth= inject(AuthService);

  logout(){
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.auth.logout();
  }

  

}
