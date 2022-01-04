import { Injectable } from '@angular/core';
import { Film } from '../model/film';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  apiURL: string = 'http://localhost:8092/films/api';
  films!: Film[];
  film: Film;
  //apiURL: string = 'http://localhost:8081/api';

  constructor(private http: HttpClient, private authService: AuthService) {
  
  }
  

  listeFilms(): Observable<Film[]> {

    let jwt = this.authService.getToken();
     jwt = "Bearer "+jwt; 
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Film[]>(this.apiURL,{headers:httpHeaders});
  }


  ajouterFilm(prod: Film): Observable<Film> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Film>(this.apiURL, prod, {headers:httpHeaders});
  }
  supprimerFilm(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
  }

  consulterFilm(id: number): Observable<Film> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Film>(url,{headers:httpHeaders});
  }
 
  updateFilm(prod: Film): Observable<Film> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Film>(this.apiURL, prod, {headers:httpHeaders});
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
