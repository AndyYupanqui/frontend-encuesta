import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class PreguntasService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url
    }

    listarPreguntas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/pregunta', { headers: headers });
    }

    listarRespuestaPreguntas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/respuesta', { headers: headers });
    }

    nuevaPregunta(form): Observable<any> {
        return this._http.post(this.url + '/pregunta', form);
    }

    buscarPregunta(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/pregunta/'+id, { headers: headers });
    }

    listarRespuestaDetallePregunta(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/respuestas_pregunta/'+id, { headers: headers });
    }

    editarPregunta(id, form): Observable<any> {
        return this._http.post(this.url + '/pregunta/'+id, form);
    }

    eliminarPregunta(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + '/pregunta/'+id, { headers: headers });
    }
}