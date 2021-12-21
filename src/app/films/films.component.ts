import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film';
import { FilmService } from '../services/film.service';
import {  Router } from '@angular/router';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html'
})
export class FilmsComponent implements OnInit {
  films: Film[];

  genres! : Genre[];
  constructor(private filmService: FilmService, private router :Router,private genreService: GenreService) {
    //this.films = filmService.listeFilms();

  }

  ngOnInit(): void {
    this.filmService.listeFilms().subscribe(prods => {
      // console.log(prods);
      this.films = prods;
    });

  }
  supprimerFilm(p: Film) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.filmService.supprimerFilm(p.idFilm).subscribe(() => {
        console.log("film supprimé");
        this.SuprimerFilmDuTableau(p);

      });
 
  }
  SuprimerFilmDuTableau(prod : Film) {
    this.films.forEach((cur, index) => {
    if(prod.idFilm=== cur.idFilm) {
    this.films.splice(index, 1);
    }
    });
    }
  /*
  supprimerFilm(p: Film) {
    //console.log(p);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
        this.filmService.supprimerFilm(p);

  }
  */

}
