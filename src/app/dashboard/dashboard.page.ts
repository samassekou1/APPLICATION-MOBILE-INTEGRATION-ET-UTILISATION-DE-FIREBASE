// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { AnimationBuilder, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  liste: any;
  public  list: any[];
  public loadlist: any[];


  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public firestore: AngularFirestore
  ) {this.listUsers()}

  ngOnInit() 
  {
    this.firestore.collection('utilisateur').valueChanges().subscribe(list =>{
      this.list = list;
      this.loadlist =list;
    });
  }


  initializeItems(): void{
    this.list = this.loadlist;
  }

  filterliter(evt){
      this.initializeItems();

      const search = evt.srcElement.value;

      if(!search){
        return;
      }

      this.list = this.list.filter(currentList=>{
        if(currentList.nom && search){
          if(currentList.nom.toLowerCase().indexOf(search.toLowerCase()) > -1){
            return true;
          }
          return false;
        }
      });
    }

  listUsers(){
    this.firestore.collection('utilisateur').valueChanges()
    .subscribe(response => {
      this.liste = response;
    })
  }
  

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
