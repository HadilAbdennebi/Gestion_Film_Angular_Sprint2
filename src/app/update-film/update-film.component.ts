import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GenreService } from '../services/genre.service';


@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styles: [
  ]
})
export class UpdateFilmComponent implements OnInit {

  genres : any;
  currentFilm = new Film();
  constructor(private activatedRoute: ActivatedRoute,private router :Router,
    private filmService: FilmService, private genreService: GenreService) { }

  ngOnInit(): void {
    this.filmService.consulterFilm(this.activatedRoute.snapshot.params.id).
    subscribe( prod =>{ this.currentFilm = prod; } ) ;
    this.genreService.listeGenres().subscribe((mqs: any) => {
      console.log(mqs);
      this.genres = mqs;
    });

    //console.log();

  }
/*
  updateFilm(){
  this.filmService.updateFilm(this.currentFilm).subscribe(prod => {
    this.router.navigate(['films']);
    },(error) => { alert("Problème lors de la modification !"); }
    );
  }  
  */
  updateFilm(updateForm : NgForm): void {
    document.getElementById('update-film-form')?.click();
  const values = updateForm.value;
 this.currentFilm.genre= {
      idGen: values.genre,
    
  };
  this.filmService
    .updateFilm(this.currentFilm)
    .subscribe((response: Film) => {
      updateForm.reset();
      this.ngOnInit();
      console.log(response);
    });
  } 
}
