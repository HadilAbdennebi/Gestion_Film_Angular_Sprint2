import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  getGenre() {
    throw new Error('Method not implemented.');
  }

  apiURL: string = 'http://localhost:8092/films/api/genre';
  genres! : Genre[];
  genre: Genre;
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  listeGenres(): Observable<Genre[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt; 
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
     return this.http.get<Genre[]>(this.apiURL,{headers:httpHeaders});  }
 

  ajouterGenre( prod: Genre):Observable<Genre>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Genre>(this.apiURL, prod, {headers:httpHeaders});    }
  
   
   supprimerGenre(id : number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
  }

consulterGenre(id: number): Observable<Genre> {
  const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Genre>(url,{headers:httpHeaders});

  }

  updateGenre(prod :Genre) : Observable<Genre>
  {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Genre>(this.apiURL, prod, {headers:httpHeaders});  }
 
  
  trierGenres() {
    this.genres = this.genres.sort((n1, n2) => {
      if (n1.idGen > n2.idGen) {
        return 1;
      }
      if (n1.idGen < n2.idGen) {
        return -1;
      }
      return 0;
    });
  }

}
