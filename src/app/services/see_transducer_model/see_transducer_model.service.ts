import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeeTranducerModel {

  private _loginUrl = "http://127.0.0.1:5000/login";

  constructor(private http: HttpClient) { }

  see_transducer_model(objeto_global:any, matrix_cod:any  ) {
    const data = { objeto_global, matrix_cod };
    console.log("estamos en el servicio")
    return this.http.post("https://apitesis-production.up.railway.app/see_transducer_model", { objeto_global, matrix_cod });
    //return this.http.post("https://apitesis-production.up.railway.app/display_modulated_signal", { objeto_global, matrix_cod });
  }
}