
import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: [
  ]
})
export class RechercheParGenreComponent implements OnInit {


  //declaration -----------------------------
  films: Film[];
  genres: Genre[];
  idGen : number;
  filmsRecherche: Film[];
  genreList: any =[];


  // constructor ----------------------------
  constructor(private filmService: FilmService,
              private  genreService:GenreService,) { }

  //init -----------------------------------
  ngOnInit(): void {
   // selected Genre
          this.genreService.listeGenres().subscribe((mqs: any) => {
            console.log(mqs);
            this.genres = mqs;
          });


  //---------------------------------------------------------------------
  // selected liste
          this.filmService.listeFilms().subscribe(fil => {
            console.log(fil);
            this.films = fil;
          });

          
  }






  


  // functions ------------------------------

    //**** select function *******
    onSelectGenre(){}

    // ***** on Change ***********
    onChange() {
      console.log(this.idGen);
      this.films = this.rechercherParGenre(this.idGen);
     /* this.filmService.listeFilms().subscribe(fil => {
        this.films = this.filmService.rechercherParGenre(this.idGen);
    });*/
    }







      //******search function******
      rechercherParGenre(idGen: number): Film[] {
        this.filmsRecherche = [];
        this.films.forEach((cur, index) => {
          if (idGen == cur.genre.idGen) {
            console.log("cur " + cur);
            this.filmsRecherche.push(cur);
          }
        });
        return this.filmsRecherche; }








        //******delete****** */

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
      
   


    }