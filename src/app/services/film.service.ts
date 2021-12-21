import { Injectable } from '@angular/core';
import { Film } from '../model/film';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  apiURL: string = 'http://localhost:8092/films/api';
  films! : Film[];
  film: Film;
  constructor(private http: HttpClient) {
    /*
    
    this.films = [
      {idFilm: 1, nomFilm: "Titanic123", prixTicket: 3000.600, dateSortie : new Date("01/14/2011") },
      {  idFilm: 2, nomFilm: "Hush", prixTicket: 450, dateSortie: new Date("12/17/2010")},
      { idFilm: 3, nomFilm: "Soul", prixTicket: 900.123, dateSortie: new Date("02/20/2020")},
      { idFilm: 4, nomFilm: "Frozen", prixTicket: 900.123, dateSortie: new Date("02/20/2020")}

    ];
    */
  }
  /*
    listeFilms(): Film[] {
      return this.films;
    }
  */

  listeFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiURL);
  }
/*
  ajouterFilm(f: Film) {
    this.films.push(f);
  }
  */
  ajouterFilm( prod: Film):Observable<Film>{
    return this.http.post<Film>(this.apiURL, prod, httpOptions);
    }
    supprimerFilm(id : number) {
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
      }
/*      
  supprimerFilm(f: Film) {
    //supprimer le Film prod du tableau Films
    const index = this.films.indexOf(f, 0);
    if (index > -1) {
      this.films.splice(index, 1);
    }
    //ou Bien
    /* this.Films.forEach((cur, index) => {
    if(prod.idFilm === cur.idFilm) {
    this.Films.splice(index, 1);
    }
    }); */
 /* }
*/
consulterFilm(id: number): Observable<Film> {
  const url = `${this.apiURL}/${id}`;
  return this.http.get<Film>(url);
  }
  /*
  consulterFilm(id: number): Film {
    this.film = this.films.find(p => p.idFilm == id);
    return this.film;
  }
*/
  updateFilm (prod :Film) : Observable<Film>
  {
  return this.http.put<Film>(this.apiURL, prod, httpOptions);
  }
   

  trierFilms() {
    this.films = this.films.sort((n1, n2) => {
      if (n1.idFilm > n2.idFilm) {
        return 1;
      }
      if (n1.idFilm < n2.idFilm) {
        return -1;
      }
      return 0;
    });
  }

}
