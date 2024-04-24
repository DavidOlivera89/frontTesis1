import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DisplayUnmodulatedCodeService {

  private _loginUrl = "http://127.0.0.1:5000/login";
  /* private _loginUrl = "https://apitesis-production.up.railway.app/login";
   */

  constructor(private http: HttpClient) { }

  display_unmodulated_code(objeto_global:any, matrix_cod:any ) {
    const data = { objeto_global, matrix_cod};
    console.log("estamos en el servicio")
    return this.http.post("http://127.0.0.1:5000/display_unmodulated_code", { objeto_global, matrix_cod});
  }
}