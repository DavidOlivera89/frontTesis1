import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Emmiter } from 'src/models/emmiter';
import { Receiver } from 'src/models/receiver';


@Injectable({
  providedIn: 'root'
})
export class Pos_receiverService {

  /* private _loginUrl = "http://127.0.0.1:5000/puntopuntos_emmiters_3d"; */
  public pos_receiver= new Receiver("rec1",0,0,0); // Objeto compartido
  public subject = new Subject<any>(); // Sujeto para publicar cambios en el objeto


  constructor(private http: HttpClient) { }

  getPos_receiver(): Observable<Receiver> {
    return this.subject.asObservable();
  }

  setPos_receiver(nuevoObjeto: Receiver) {
    this.pos_receiver = nuevoObjeto;
    this.subject.next(this.pos_receiver); // Publicar el cambio en el objeto
  }

  updatePos_receiver(receiver: any, variable: string, value: any){
    interface Receiver {
      [key: string]: string | number; // Firma de índice: cualquier propiedad con nombre de cadena debe ser de tipo number
    }
    /* this.validateInputEnteros(value ) ;  */
    value.preventDefault(); // Evita la recarga
    console.log(variable);
    console.log(`Receptor modificado en ${variable}:`, receiver);
    console.log(`Valor actual del campo de entrada (${variable}):`, value.target.value
    );

    if ((variable == "x")||(variable == "y")||(variable == "z")){
    this.pos_receiver[variable]=<number> value.target.value;
    }
    /* let receiverToUpdate : Receiver | undefined;
    //emitterToUpdate = this.emmiters.find(emitter => emmit.name === emitter.name)?emmit:{name:'error', x:0, y:0, z:0};
    receiverToUpdate = this.pos_receiver */
    

    
    console.log('pos_emision');
    console.table(this.pos_receiver);
  }
}


