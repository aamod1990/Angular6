import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments';
import { User } from '../models';
@Injectable()
export class UserService {
   constructor(private http: HttpClient) { }
register(user: User) {
  console.log("aasdasd",user);
    return this.http.post(`${environment.baseURL}/users/register`, user);
}
}
