import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Emmiter } from 'src/models/emmiter';


@Injectable({
  providedIn: 'root'
})
export class Pos_emiService {

  /* private _loginUrl = "http://127.0.0.1:5000/puntopuntos_emmiters_3d"; */
  public pos_emision: Emmiter[] = []; // Objeto compartido
  public subject = new Subject<any>(); // Sujeto para publicar cambios en el objeto


  constructor(private http: HttpClient) { }

  get getPos_emision(): Observable<Emmiter[]> {
    return this.subject.asObservable();
  }

  set setPos_emision(nuevoObjeto: Emmiter[]) {
    this.pos_emision = nuevoObjeto;
    this.subject.next(this.pos_emision); // Publicar el cambio en el objeto
  }

  updatePos_emision(emmit: any, variable: string, value: any){
    interface Emmiter {
      [key: string]: string | number; // Firma de índice: cualquier propiedad con nombre de cadena debe ser de tipo number
    }
    /* this.validateInputEnteros(value ) ;  */
    value.preventDefault(); // Evita la recarga
    console.log(variable);
    console.log(`Emisor modificado en ${variable}:`, emmit);
    console.log(`Valor actual del campo de entrada (${variable}):`, value.target.value
    );


    let emitterToUpdate : Emmiter | undefined;
    //emitterToUpdate = this.emmiters.find(emitter => emmit.name === emitter.name)?emmit:{name:'error', x:0, y:0, z:0};
    emitterToUpdate = this.pos_emision.find(emitter => emmit.name === emitter.name)?emmit:{name:'error', x:0, y:0, z:0};
    

    if (emitterToUpdate && emitterToUpdate['name'] !== 'error') {
      // Actualizamos el valor de y a 10
      emitterToUpdate[variable] = <number> value.target.value;
      console.table(emitterToUpdate);

      this.pos_emision

    } else {
      console.log('No se encontró el emisor con nombre "e1".');
    }

    //this.pos_emiService.pos_emision=this.pos_emision;

    /* console.log('this.emmiters');
    console.table(this.emmiters); */
    console.log('pos_emision');
    console.table(this.pos_emision);
  }
}


