// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import * as firebase from "firebase/compat";
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable, of } from "rxjs";
import {switchMap} from 'rxjs/operators';


export class USER{
  nom: string;
  prenom: string;
  email: string;
  password: string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  user$: Observable<USER>
  user: USER;
  
  constructor(
    private ngFire: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { 
    this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if (user){
          return this.ngFire.doc<USER>(`utilisateur/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }

  create(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getList(){
    return this.ngFire.collection('utilisateur').snapshotChanges();
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }


}

