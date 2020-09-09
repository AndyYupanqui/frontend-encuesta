import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class GeneralService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url
    }

    listarDimensiones(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/dimension', { headers: headers });
    }
    
    cantidadEncuestados(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/alumnos', { headers: headers });
    }

    actualizarDatos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/traer_data', { headers: headers });
    }
}