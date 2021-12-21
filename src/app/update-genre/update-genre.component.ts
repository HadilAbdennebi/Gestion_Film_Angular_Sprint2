import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';
import {  ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html'
})
export class UpdateGenreComponent implements OnInit {

  currentGenre = new Genre();
  constructor(private activatedRoute: ActivatedRoute,private router :Router,
    private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.consulterGenre(this.activatedRoute.snapshot.params.id).
    subscribe( prod =>{ this.currentGenre = prod; } ) ;
   
  }

  updateGenre(){
  this.genreService.updateGenre(this.currentGenre).subscribe(prod => {
    this.router.navigate(['genres']);
    },(error) => { alert("Problème lors de la modification !"); }
    );
  }
    


}
