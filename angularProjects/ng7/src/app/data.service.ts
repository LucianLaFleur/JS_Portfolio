import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

// this setup can communicate with a database
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

 getUsers(){
    return this.http.get('https://reques.in/api/users')
  }
}
