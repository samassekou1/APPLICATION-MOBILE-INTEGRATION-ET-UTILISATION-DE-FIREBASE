import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthenticateService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;
  constructor(

    private authService: AuthenticateService,
    public router: Router
  ) {this.sideMenu();}

  sideMenu(){
    this.navigate =[
      {
        title: 'Profil',
        url: '/profil',
        icon: 'person-circle-outline'
      },
      {
        title: 'dashboard',
        url: '/dashboard',
        icon: 'people-circle-outline'
      },
      {
        title: 'Deconnexion',
        url: '/login',
        icon: 'power-outline'
      }
    ]
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
      })
  }
}
