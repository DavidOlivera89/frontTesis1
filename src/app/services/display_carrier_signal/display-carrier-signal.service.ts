import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayCarrierSignalService {

  private _loginUrl = "http://127.0.0.1:5000/login";

  constructor(private http: HttpClient) { }

  display_carrier_signal( carrier_type: any, carrierFreq: any, oversampling_factor: any, carrier_cycles: any ) {
    const data = { carrier_type, carrierFreq, oversampling_factor, carrier_cycles};
    console.log("estamos en el servicio")
    return this.http.post("http://127.0.0.1:5000/display_carrier_signal", { carrier_type, carrierFreq, oversampling_factor, carrier_cycles});
  }
}