import { Genre } from "./genre";

export class Film {
    idFilm : number;
    nomFilm : string;
    prixTicket : number;
     dateSortie : Date ;
     genre!: Genre;
    }