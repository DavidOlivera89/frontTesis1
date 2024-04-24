import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Display_emmiters_receiver_3d {


  private _loginUrl = "http://127.0.0.1:5000/puntopuntos_emmiters_3d";

  constructor(private http: HttpClient) { }

  display_emmiters_receiver_3d( emmiters:any, receiver:any) {
    //const data = { objeto_global, matrix_cod};
    console.log("estamos en el servicio display_emmiters_receiver_3d")
    return this.http.post("https://apitesis-production.up.railway.app/display_emmiters_receiver_3d", {emmiters, receiver});
  }
}