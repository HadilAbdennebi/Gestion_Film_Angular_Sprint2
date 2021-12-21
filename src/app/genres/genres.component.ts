import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit {

  genres: Genre[];
  constructor(private genreService: GenreService, private router :Router) {
  }

  ngOnInit(): void {
    this.genreService.listeGenres().subscribe(prods => {
      // console.log(prods);
      this.genres = prods;
    });

  }
  supprimerGenre(p: Genre) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.genreService.supprimerGenre(p.idGen).subscribe(() => {
        console.log("genre supprimé");
        this.SuprimerGenreDuTableau(p);

      });
 
  }
  SuprimerGenreDuTableau(prod : Genre) {
    this.genres.forEach((cur, index) => {
    if(prod.idGen=== cur.idGen) {
    this.genres.splice(index, 1);
    }
    });
    }
 
}
