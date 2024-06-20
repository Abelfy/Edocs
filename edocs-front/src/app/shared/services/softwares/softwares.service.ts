import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoftwaresService {

  constructor(private http : HttpClient) { }
  
  fetchSoftwares() {
    return this.http.get<any>('http://localhost:3000/softwares');
  }
}
