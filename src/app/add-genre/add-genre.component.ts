import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html'})
export class AddGenreComponent implements OnInit {

  newGenre = new Genre();
  message :string;
  constructor(private genreService: GenreService,private router :Router) { }

  ngOnInit(): void {
  }

  addGenre(){
    this.genreService.ajouterGenre(this.newGenre)
    .subscribe(prod => {
    console.log(prod);
    });
    this.router.navigate(['genres']).then(() => {
      window.location.reload();
      });
    }

}
