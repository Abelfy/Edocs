import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionnalitiesService {

  constructor(private http : HttpClient) { }
  
  fetchSoftwares() {
    return this.http.get<any>('http://localhost:3000/softwares/1/versions/1/functionnalities');
  }
}
