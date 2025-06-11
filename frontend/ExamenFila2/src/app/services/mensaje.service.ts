import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensaje } from '../models/mensaje';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class MensajeService {
  public url: string;

  constructor(private _http: HttpClient){
    this.url = Global.url;
  }

  guardarMensaje(mensaje: Mensaje): Observable<any> {
    let params = JSON.stringify(mensaje);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'guardar-mensaje', params, {headers: headers});
  }
}
