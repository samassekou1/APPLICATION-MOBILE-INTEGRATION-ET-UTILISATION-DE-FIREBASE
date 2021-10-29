import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  user: any;
  constructor(
    private auth: AuthenticateService
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user=>{
      this.user = user;
    })
  }

}
