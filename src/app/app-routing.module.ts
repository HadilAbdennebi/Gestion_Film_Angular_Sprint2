import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFilmComponent } from './add-film/add-film.component';
import { FilmsComponent } from './films/films.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { GenresComponent } from './genres/genres.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';


const routes: Routes = [
  {path: "films", component : FilmsComponent},
  {path: "add-films", component : AddFilmComponent},
  { path: "", redirectTo: "films", pathMatch: "full" },
  {path: "updateFilm/:id", component: UpdateFilmComponent},
  {path: "genres", component : GenresComponent},
  {path: "add-genre", component : AddGenreComponent},
  {path: "updateGenre/:id", component: UpdateGenreComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
