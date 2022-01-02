import { Component, OnInit } from '@angular/core';
import { Film } from '../model/Film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  films: Film[];
  
  constructor(private filmService : FilmService) { }

  ngOnInit(): void {
    
    this.filmService.listeFilms().subscribe(fil => {
      console.log(fil); 
      this.films = fil; 
         });


  }
  public searchFilm(key: string): void {
    const resultat: Film[] = [];
    for (const v of this.films) {
      if (v.nomFilm.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
      }
    this.films = resultat;
   
  }


}
