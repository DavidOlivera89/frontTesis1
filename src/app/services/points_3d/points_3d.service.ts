import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class points_3d {

  private _loginUrl = "http://127.0.0.1:5000/puntopuntos_emmiters_3d";

  constructor(private http: HttpClient) { }

  points_3d( emmiters:any) {
    //const data = { objeto_global, matrix_cod};
    console.log("estamos en el servicio points_3d")
    return this.http.post("http://127.0.0.1:5000/puntos_emmiters_3d", {emmiters});
  }
}