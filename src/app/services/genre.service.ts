import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private http: HttpClient) {
  }
  listeGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiURL);
  }

  ajouterGenre( prod: Genre):Observable<Genre>{
    return this.http.post<Genre>(this.apiURL, prod, httpOptions);
    }
    supprimerGenre(id : number) {
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
      }

consulterGenre(id: number): Observable<Genre> {
  const url = `${this.apiURL}/${id}`;
  return this.http.get<Genre>(url);
  }

  updateGenre(prod :Genre) : Observable<Genre>
  {
  return this.http.put<Genre>(this.apiURL, prod, httpOptions);
  }
 
  
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
