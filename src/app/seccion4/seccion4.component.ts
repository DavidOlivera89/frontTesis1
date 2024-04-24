import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SpinnerService } from '../services/spinnerService/spinner-service.service';
import { Pos_emiService } from '../services/pos_emi/pos_emi.service';
import { Pos_receiverService } from '../services/pos_receiver/pos_receiver.service';
import { Emmiter } from 'src/models/emmiter';
import { Receiver } from 'src/models/receiver';
import { points_3d } from '../services/points_3d/points_3d.service';
import { Display_emmiters_receiver_3d } from '../services/display_emmiters_receiver_3d/display_emmiters_receiver_3d.service';

@Component({
  selector: 'app-seccion4',
  templateUrl: './seccion4.component.html',
  styleUrls: ['./seccion4.component.css']
})
export class Seccion4Component {

 
form: FormGroup<any>;
isEnabledDisplay_unmodulated: any;
/* graficoPuntos3D: any; */
output: any;
spinnerService = inject(SpinnerService);
pos_emision: Emmiter[] = [];
graficoJSON: any;
//rueba=true;


pos_emiService=inject(Pos_emiService);
pos_receiverService=inject(Pos_receiverService);
points_3d = inject(points_3d);
display_emmiters_receiver_3d_Service = inject(Display_emmiters_receiver_3d);

isEditableFse= true;
isEditableDownsamling= true;

receiver: Receiver | undefined;
showSeccion4= false;
/* receiver= new Receiver("rec1", 0, 0, 0);
 */



  constructor(private location: Location) {
    this.form = new FormGroup({
      white_gaussian_noise: new FormControl('', Validators.required),
      impulsive_noise: new FormControl('', Validators.required),
      snr: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      snr_impulsive_noise: new FormControl('', Validators.required),
    });

    // Verificar si existe pos_receiver, si no existe, crear uno nuevo
    this.pos_receiverService.getPos_receiver().subscribe((receiver: Receiver) => {
      if (!receiver) {
        this.receiver = this.pos_receiverService.pos_receiver;
        this.pos_receiverService.setPos_receiver(this.receiver);
      } else {
        this.receiver = receiver;
      }
    }); console.log("seccion3");
    console.table(this.pos_emision);
  }

  ngOnInit() {
    
    console.log("seccion3");
    console.table(this.pos_emiService.pos_emision);

    
  }

  onEmmiterChange(emmit: any, variable: string, value: any) {
   
    value.preventDefault(); // Evitar la recarga
    console.log(variable);
    console.log(`Emisor modificado en ${variable}:`, emmit);
    console.log(`Valor actual del campo de entrada (${variable}):`, value.target.value
    );

    this.pos_emiService.updatePos_emision(emmit, variable, value);
    this.graficoJSON=false;
  }

  onReceiverChange(receiver: any, variable: string, value: any) {
   
    value.preventDefault(); // Evitar la recarga
    console.log(variable);
    console.log(`Emisor modificado en ${variable}:`, receiver);
    console.log(`Valor actual del campo de entrada (${variable}):`, value.target.value
    );

    this.pos_receiverService.updatePos_receiver(receiver, variable, value);
    this.graficoJSON=false;
  }


  validateInputEnteros(event: KeyboardEvent) {
    const char = event.key;
    // Permitir números, punto, + y -
    if (!/[\d.]/.test(char)) {
      event.preventDefault();
    }
  }


  onEnterPress(event: any) {
    event.preventDefault();
  }

  display_emmiters_receiver_3d() {
    
    this.spinnerService.show();
    this.display_emmiters_receiver_3d_Service.display_emmiters_receiver_3d(this.pos_emiService.pos_emision, this.pos_receiverService.pos_receiver).subscribe(
    
      (response: any) => {
        console.log(response);
        this.spinnerService.hide();
        this.graficoJSON = JSON.parse(response.graph);
        console.table(this.graficoJSON);
        console.log(this.graficoJSON instanceof Array);
      },

      (error) => {
        this.spinnerService.hide();
        console.error(error);
        
      }
    );
  }

  reloadGrafico() {
    console.log(this.receiver);
    console.log(this.pos_emiService.pos_emision)
    this.display_emmiters_receiver_3d();

  }

  onSubmit(){
    console.log("Sale el form seccion3")
  }

  setDefaultValues() {
    this.reloadGrafico();
    this.form.patchValue({
      receiver_sampling_frequency: 500,
      downsampling:1
    })
    this.isEditableDownsamling=false;


  }

}