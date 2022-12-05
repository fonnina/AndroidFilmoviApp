import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentikacijaService } from '../autentikacija.service';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  // logInForm = this.formBuilder.group({
  //   email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zA-Z]{2,4}$')]],
  //   password: ['', [Validators.required, Validators.minLength(7)]]
  //  }
  //  );

  //  public errorMessages = {
  //   email: [
  //     {type: 'required', message: 'Email je obavezan'},
  //     {type: 'pattern', message: 'Molimo Vas unesite validan email'}
  //   ],
  //   password: [
  //     {type: 'required', message: 'Lozinka je obavezna'},
  //     {type: 'minlength', message: 'Lozinka ne moze imati manje od 7 karaktera'}
  //   ]
  //  };

    constructor(private formBuilder: FormBuilder,
      private autentServis: AutentikacijaService, private router: Router, private alertCtrl: AlertController) { }
    //  get email(){
    //   return this.logInForm.get('email');
    //  }
    //  get password(){
    //   return this.logInForm.get('password');
    //  }


    // public submit(){
    //   console.log(this.logInForm.value);
    // }

  ngOnInit() {
  }
  onLogIn(form: NgForm) {
    console.log(form);
    if (form.valid) {
        this.autentServis.logIn(form.value).subscribe((resData) => {
                console.log('prijava uspesna');
                console.log(resData);
                this.router.navigateByUrl('/filmovi/tabs/romanticni');
            },
            errRes => {
                console.log(errRes);
                const message = 'Incorrect email or password';

                // const code = errRes.error.error.message;
                // if (code === 'EMAIL_NOT_FOUND') {
                //     message = 'Email address could not be found.';
                // } else if (code === 'INVALID_PASSWORD') {
                //     message = 'This password is not correct.';
                // }

                this.alertCtrl.create(
                    {
                        header: 'Authentication failed',
                        message,
                        buttons: ['Okay']
                    }
                ).then((alert) => {
                    alert.present();
                });

                form.reset();
            });
    }
}
}
