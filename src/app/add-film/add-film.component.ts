import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Film } from '../model/film';
import { FilmService } from '../services/film.service';
import {  Router } from '@angular/router';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html'})
export class AddFilmComponent implements OnInit {
 // genres! :Genre[];
  newFilm = new Film();
  message :string;
  Films! : Film[];
  genres: any;
  genreList!: Genre[];
  //@Output() sendDataToFilmParent: EventEmitter<Film> = new EventEmitter();
  //filmForm: FormGroup;

  constructor(private filmService: FilmService,
              private  genreService:GenreService,
              private router :Router) {}

/*
  addFilm(){
    this.filmService.ajouterFilm(this.newFilm)
    .subscribe(prod => {
    console.log(prod);
    });
    this.router.navigate(['films']).then(() => {
      window.location.reload();
      });
    }
  
   */
    ngOnInit(): void {
      this.genreService.listeGenres().subscribe((mqs: any) => {
        console.log(mqs);
        this.genres = mqs;
      });
    }
    addFilm(addForm : NgForm): void {
      document.getElementById('add-film-form')?.click();
    const values = addForm.value;
    let film: Film = {
      idFilm: values.idFilm,
      nomFilm: values.nomFilm,
      prixTicket: values.prixTicket,
      dateSortie: values.dateSortie,
      genre: {
        idGen: values.genre,
      },
    };
    this.filmService
      .ajouterFilm(film)
      .subscribe((response: Film) => {
        addForm.reset();
        this.ngOnInit();
        console.log(response);
      });
      this.router.navigate(['films']).then(() => {
        window.location.reload();
        });
    }
    onSelectGen() {
      this.genreService.listeGenres().subscribe((response) => {
        console.log(response);
        this.genreList = response;
      });
    }
  


}
