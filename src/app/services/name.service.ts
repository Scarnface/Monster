import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  constructor(private http: HttpClient) {}

  getName() {
    return this.http.get('https://monsternames-api.com/api/v1.0/orc');
  }
}
