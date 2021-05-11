import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Dados} from '../Models/Dados';


@Injectable({
  providedIn: 'root'
})
export class DadosService {

  baseURL = `${environment.mainUrlAPI}`;

  constructor(private http: HttpClient) { }

  getByCep(cep:string): Observable<Dados[]> {
    return this.http.get<Dados[]>(`${this.baseURL}/${cep}/json/`);
  }

}
