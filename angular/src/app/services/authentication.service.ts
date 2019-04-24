import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments';

@Injectable()
export class AuthenticationService {
  constructor(private http:HttpClient){}
  login(username: string, password: string){
    return this.http.post<any>(`${environment.baseURL}/users/authenticate`,{ username: username, password: password })
    .pipe(map(user =>{
      // When login successful
      if(user && user.token){
        // store in local browser
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }
  logout(){
    // remove user from local store
    localStorage.removeItem('currentUser');
  }
}
