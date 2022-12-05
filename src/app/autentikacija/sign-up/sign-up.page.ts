import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutentikacijaService } from '../autentikacija.service';

 @Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  })
 export class SignUpPage implements OnInit {

  registrationForm: FormGroup;
  public errorMessages = {
    ime: [
      {type: 'required', message: 'Ime je obavezno'},
      {type: 'maxlength', message: 'Ime ne moze biti duze od 30 karaktera'}
    ],
    prezime: [
      {type: 'required', message: 'Prezime je obavezno'},
      {type: 'maxlength', message: 'Prezime ne moze biti duze od 30 karaktera'}
    ],
    email: [
      {type: 'required', message: 'Email je obavezan'},
      {type: 'pattern', message: 'Molimo Vas unesite validan email'}
    ],
    password: [
      {type: 'required', message: 'Lozinka je obavezna'},
      {type: 'minlength', message: 'Lozinka ne moze imati manje od 7 karaktera'}
    ],
   };
  constructor(private formBuilder: FormBuilder,private autentServis: AutentikacijaService,
    private router: Router, private loadingCtrl: LoadingController) { }


  //   get ime(){
  //     return this.registrationForm.get('ime');
  //    }
  //    get prezime(){
  //     return this.registrationForm.get('prezime');
  //    }
  //    get email(){
  //     return this.registrationForm.get('email');
  //    }
  //    get password(){
  //     return this.registrationForm.get('password');
  //    }

ngOnInit(){
 this.registrationForm = new FormGroup({
  ime: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  prezime:  new FormControl('', [Validators.required, Validators.maxLength(30)]),
  email:  new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zA-Z]{2,4}$')]),
  password:  new FormControl('', [Validators.required, Validators.minLength(7)]),
 }
 );
}

onRegister() {
  this.loadingCtrl.create({message: 'Registrovanje...'}).then((loadingEl)=>{
loadingEl.present();
console.log(this.registrationForm);
  this.autentServis.signUp(this.registrationForm.value).subscribe(resData => {
      console.log('Uspesno ste se registrovali');
      console.log(resData);
      loadingEl.dismiss();
      this.router.navigateByUrl('/log-in');
  });
  });

}

   }


//   MustMatch(controlName: string, matchingControlName: string){
//   return( formGroup: FormGroup)=>{
//  const control=formGroup.controls[controlName];
//  const matchingControl=formGroup.controls[matchingControlName];
//   if(matchingControl.errors && !matchingControl.errors.MustMatch){
//       return;
//              }
//  if(control.value !== matchingControl.value){
//             matchingControl.setErrors({MustMatch:true});
//                  }
//                      else{
//                               matchingControl.setErrors(null);
//            }
//      }
//     }
