import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AutentikacijaService } from '../autentikacija/autentikacija.service';
import { FilmoviModel } from './filmovi.model';

interface FilmoviData{
  slikaUrl: string;
  nazivFilm: string;
  opis: string;
  zanr: string;
  detaljanOpis: string;
  korisnikId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmoviService {

  //httpOptions = {

    //headers: new HttpHeaders({
    //    'Access-Control-Allow-Origin': 'http://localhost:8100',
    //    'Content-Type' : 'application/json',

    //  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS,PUT',

    //   'Access-Control-Allow-Headers': 'Content-Type'
   //}),
  //};
 //filmovi:  FilmoviModel[] =[
//     {
//       id: '1',
//       slikaUrl:'/assets/adorable-pug-puppy-solo-portrait.jpg',
//       nazivFilm:'Koky',
//    opis:'Koky mopsic krece na uzbudljiv medeni mesec sa svojom izabranom dragom mopsicom',
//    zanr: 'horor',
//    detaljanOpis: 'Koky mopsic krece na uzbudljiv medeni mesec sa svojom izabranom dragom mopsicom kkkkkkkkkkkkkk'
//   },
//    {
//     id:'2',
//     slikaUrl:'/assets/nica.jpg',
//    nazivFilm:'Nica slaninica',
//    opis:'Nica slaninica kraljica univerzuma',
//    zanr:'komedija',
//    detaljanOpis: 'Nica slaninica, zarezi joj ne idu od ruke'
//   }
//];


filmovi=new BehaviorSubject<FilmoviModel[]>([]);
  constructor(private http: HttpClient,
    private autentServis: AutentikacijaService) {}
  // dodajFilm(nazivFilm: string, opis: string){
  //   this.http.post<{ime: string}>(`https://filmkopro-default-rtdb.europe-west1.firebasedatabase.app/filmovi.json`,{
  //     nazivFilm,
  //     opis

  //   });

  // }

get filmoviG(){
  return this.filmovi.asObservable();
 }

 editFilm(id, slikaUrl, nazivFilm,opis, zanr, detaljanOpis, korisnikId){
  return this.autentServis.token.pipe(
    take(1),
    switchMap((token) =>
         this.http
            .put(`https://filmovi-e4c42-default-rtdb.europe-west1.firebasedatabase.app/filmovi/${id}.json?auth=${token}`, {
                slikaUrl,
                nazivFilm,
                opis,
                zanr,
                detaljanOpis,
                korisnikId
            })
    ),
    switchMap(() => this.filmovi),
    take(1),
    tap((filmoviG) => {
        const updatedFilmIndex = filmoviG.findIndex((f) => f.id === id);
        const updatedFilmovi = [...filmoviG];
        updatedFilmovi[updatedFilmIndex] = new FilmoviModel(
            id,
            slikaUrl,
            nazivFilm,
            opis,
            zanr,
            detaljanOpis,
            '1'
        );
        this.filmovi.next(updatedFilmovi);
    })
);

 }
// dodajFilm(slikaUrl: string, nazivFilm: string, opis: string, zanr: string, detaljanOpis: string, korisnikId: string){
//   let generisaniId;
//   return this.http.post<{name: string}>(`https://filmkopro-default-rtdb.europe-west1.firebasedatabase.app/filmovi.json`,{
//     slikaUrl,
//     nazivFilm,
//     opis,
//     zanr,
//     detaljanOpis,
//     korisnikId

//   }).pipe(switchMap((resData)=>{
//     generisaniId = resData.name;
//     return this.filmoviG;

//   }), take(1), tap((filmovi)=>{
//     this.filmovi.next(filmovi.concat({
//       id: generisaniId,
//       slikaUrl,
//      nazivFilm,
//      opis,
//     zanr,
//     detaljanOpis,
//     korisnikId
//     }));

//   }));

// }
dodajFilm(slikaUrl: string,nazivFilm: string, opis: string, zanr: string, detaljanOpis: string) {
  let generisanId;
  let newFilm: FilmoviModel;
  let fetchedKorisnikId: string;

  return this.autentServis.korisnikId.pipe(
      take(1),
      switchMap(korisnikId => {
          fetchedKorisnikId = korisnikId;
          return this.autentServis.token;
      }),
      take(1),
      switchMap((token) => {
          newFilm = new FilmoviModel(
              null,
              slikaUrl,
              nazivFilm,
              opis,
              zanr,
              detaljanOpis,
              fetchedKorisnikId
          );

          return this.http
              .post<{ name: string }>(
                  `https://filmovi-e4c42-default-rtdb.europe-west1.firebasedatabase.app/filmovi.json?auth=${token}`,
                  newFilm
              );
      }),
      switchMap((resData) => {
          generisanId = resData.name;
          return this.filmoviG;
      }),
      take(1),
      tap((filmoviG) => {
          newFilm.id = generisanId;
          this.filmovi.next(
              filmoviG.concat(newFilm)
          );
      })
  );
}

getFilmovi(){
  return this.http.get<{[key: string]: FilmoviData}>(`https://filmovi-e4c42-default-rtdb.europe-west1.firebasedatabase.app/filmovi.json`)
  .pipe(map((filmData)=>{
    const filmovi: FilmoviModel[]=[];
    for(const key in filmData){
          if(filmData.hasOwnProperty(key)){
         filmovi.push({ //this.
            id: key,
            slikaUrl: filmData[key].slikaUrl,
            nazivFilm: filmData[key].nazivFilm,
            opis: filmData[key].opis,
            zanr: filmData[key].zanr,
            detaljanOpis: filmData[key].detaljanOpis,
            korisnikId: filmData[key].korisnikId

            });
                   }
      }
return filmovi;
  }), tap(filmovi => {
    this.filmovi.next(filmovi);
  }));
}


// getFilm(id: string){
// return this.filmovi.find((f) => f.id === id);
// }

//staro
// getFilm(id: string){
// let vrati: FilmoviModel;
// this.filmovi.asObservable().subscribe(result=>{
//  result.forEach(element => {
//    if(element.id===id){
//     console.log('nasao sam nesto');
//      vrati= element;
//      console.log(vrati);
//    }
//  }
//  );


// });
// return vrati;


//  }
getFilm(id: string) {
  return this.autentServis.token.pipe(
      take(1),
      switchMap((token) =>
          this.http
              .get<FilmoviData>
              (`https://filmovi-e4c42-default-rtdb.europe-west1.firebasedatabase.app/filmovi/${id}.json?auth=${token}`)
      ),
      map((resData) => {
          console.log(resData);
          return new FilmoviModel(
              id,
              resData.slikaUrl,
              resData.nazivFilm,
              resData.opis,
              resData.zanr,
              resData.detaljanOpis,
              resData.korisnikId
          );
      })
  );

}


deleteFilm(id: string) {
        return this.autentServis.token.pipe(

            take(1),
            switchMap((token) =>
                  this.http.delete
                    (`https://filmovi-e4c42-default-rtdb.europe-west1.firebasedatabase.app/filmovi/${id}.json?auth=${token}`)
            ),
            switchMap(() => (
                this.filmoviG)
            ),
            take(1),
            tap((filmoviG) => {
                this.filmovi.next(filmoviG.filter((f) => f.id !== id));

            })
        );
    }


}
