import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8081/users';
  token: string;
  private helper = new JwtHelperService();

  
  public loggedUser: string;
  isloggedIn : Boolean = false;
  public roles: string[] ;
  constructor(private router: Router , private http : HttpClient) { }

  login(user : User) { 
    return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'}); 
  }

  saveToken(jwt:string){ 
    localStorage.setItem('jwt',jwt); 
  this.token = jwt; 
  this.isloggedIn = true;
  this.decodeJWT(); }

  decodeJWT() { 
    if (this.token == undefined)
    return; 
    const decodedToken = this.helper.decodeToken(this.token); 
    this.roles = decodedToken.roles; 
    //console.log("roles "+this.roles)
    this.loggedUser = decodedToken.sub; 
  }

    loadToken() { 
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  
 }

 isTokenExpired(): Boolean { 
   return this.helper.isTokenExpired(this.token); 
  }

  getToken():string { 
    return this.token; 
  }

  logout() {
    this.loggedUser = undefined; 
    this.roles = undefined; 
    this.token = undefined; 
    this.isloggedIn = false; 
    localStorage.removeItem('jwt'); 
    this.router.navigate(['/login']);
         } 
         
     
  isAdmin():Boolean{
    if (!this.roles) 
    return false;
    return this.roles.indexOf('ADMIN') >=0;
    
    }

  setLoggedUserFromLocalStorage(login : string) { 
    this.loggedUser = login; 
    this.isloggedIn = true; 
    this.getUserRoles(login); } 
    
    getUserRoles(login :string){ 
    //  this.users.forEach((curUser) => { 
      //  if( curUser.username == username ) { 
         // this.roles = curUser.roles; } }); 
        }
         
}
