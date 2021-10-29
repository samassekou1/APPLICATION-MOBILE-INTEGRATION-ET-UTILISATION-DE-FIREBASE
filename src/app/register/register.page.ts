// register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  saveForm: FormGroup;
  profile: any;
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private afdb: AngularFireDatabase
  ) { }

  ngOnInit() {

    this.saveForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: ['']
    })

    this.validations_form = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  enregistrer(){
      this.authService.create(this.saveForm.value['email'], this.saveForm.value['password'])
      .then((resp)=>{
        this.profile = this.firestore.collection('utilisateur').doc(resp.user.uid).set({
          'nom': this.saveForm.value["nom"],
          'prenom': this.saveForm.value["prenom"],
          'email': this.saveForm.value["email"],
          'password': this.saveForm.value["password"]
        })
        this.saveForm.reset();
      }).catch((err)=>{
        console.log(err)
      });
    }
  }
