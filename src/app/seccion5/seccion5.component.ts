/* import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seccion5',
  templateUrl: './seccion5.component.html',
  styleUrls: ['./seccion5.component.css']
})
export class Seccion5Component {

  constructor(private location: Location) { }

  onSubmit(form: NgForm) {
    // Aquí se puede hacer algo con los datos del formulario
    console.log(form.value);
    // Luego se escrollea hacia abajo el contenedor principal
    this.location.replaceState('/seccion1');
    window.scrollBy(0, window.innerHeight);
  }

} */

// Código del componente de Angular
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

//PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-seccion5',
  templateUrl: './seccion5.component.html',
  styleUrls: ['./seccion5.component.css']
})
export class Seccion5Component implements OnInit {

  // Variable para almacenar el objeto JSON del gráfico
  graficoJSON: any;

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit(): void {
    // Hacer una petición HTTP GET a la ruta de la API de Flask que devuelve el gráfico
    this.http.get("http://localhost:5000/grafico_2").subscribe(
      // Si la petición es exitosa, obtener la respuesta como un objeto JSON
      (response: any) => {
        // Asignar el objeto JSON a la variable graficoJSON
        console.log(typeof response);
        //console.log('data' in response); 
        this.graficoJSON = JSON.parse(response);
        console.table(this.graficoJSON);
        console.log(this.graficoJSON instanceof Array); 
        
      },
      // Si la petición falla, mostrar un mensaje de error
      (error) => {
        console.log(error);
      }
    );
  }

  /*onSubmit(form: NgForm) {
    // Aquí se puede hacer algo con los datos del formulario
    console.log(form.value);
    // Luego se escrollea hacia abajo el contenedor principal
    this.location.replaceState('/seccion1');
    window.scrollBy(0, window.innerHeight);
  }*/


}
