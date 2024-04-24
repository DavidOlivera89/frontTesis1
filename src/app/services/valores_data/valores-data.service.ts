import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoresDataService {

  private valoresSource = new BehaviorSubject({
    x: 34,
    z: 50,
    altura: 2.4,
    elevacion: 3.01
  });
  currentValores = this.valoresSource.asObservable();

  constructor() { }

  changeValores(valores: any) {
    this.valoresSource.next(valores)
  }
}
