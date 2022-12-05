import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Korisnik } from './korisnik.model';

export interface AutentikacijaData {
  kind: string;
  idToken: string;
  email: string;
  //refreshToken: string;
  localId: string;
  expiresIn: string;
  registred?: boolean;
}

export interface KorisnikData {
  ime?: string;
  prezime?: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AutentikacijaService {

  private daLiJeKorisnikAuth = false;
  private korisnikk = new BehaviorSubject<Korisnik>(null);

  constructor(private http: HttpClient) { }

  get daLiJeKorisnikAut(){
    return this.korisnikk.asObservable().pipe(
      map((korisnik) => {
          if (korisnik) {
              return !!korisnik.token; //konverzija
          } else {
              return false;
          }
      })
  );
  }

  get korisnikId() {
    return this.korisnikk.asObservable().pipe(
        map((korisnik) => {
            if (korisnik) {
                return korisnik.id;
            } else {
                return null;
            }
        })
    );
}

get token() {
  return this.korisnikk.asObservable().pipe(
      map((korisnik) => {
          if (korisnik) {
              return korisnik.token;
          } else {
              return null;
          }
      })
  );
}
  logIn(korisnik: KorisnikData) {
    this.daLiJeKorisnikAuth = true;
    return this.http.post<AutentikacijaData>
    (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseKey}`,
        {
            email: korisnik.email,
            password: korisnik.password,
            returnSecureToken: true
        }).pipe(tap(korisnikData => {
        const expirationDate = new Date(new Date().getTime() + +korisnikData.expiresIn * 1000);
        const newKorisnik = new Korisnik(korisnikData.localId, korisnikData.email, korisnikData.idToken, expirationDate);
        this.korisnikk.next(newKorisnik);
    }));
  }

  logOut() {
    this.korisnikk.next(null);
    //this.daLiJeKorisnikAut = false;
  }
  signUp(korisnik: KorisnikData){
    //this.daLiJeKorisnikAut = true;
    this.daLiJeKorisnikAuth = true;
    return this.http.post<AutentikacijaData>
    (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseKey}`, {
        email: korisnik.email,
        password: korisnik.password,
        returnSecureToken: true
    }).pipe(tap(korisnikData => {
        const expirationDate = new Date(new Date().getTime() + +korisnikData.expiresIn * 1000);
        const newKorisnik = new Korisnik(korisnikData.localId, korisnikData.email, korisnikData.idToken, expirationDate);
        this.korisnikk.next(newKorisnik);
    }));
  }
}
