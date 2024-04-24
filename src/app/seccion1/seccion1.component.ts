import { Component } from '@angular/core';
import { FormGroup, NgForm, NgModel,FormControl, Validators  } from '@angular/forms';
import { Location } from '@angular/common';

import * as d3 from 'd3';
import * as d33d from 'd3-3d';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-seccion1',
  templateUrl: './seccion1.component.html',
  styleUrls: ['./seccion1.component.css']
})
export class Seccion1Component {
  formGroup: FormGroup;
  csv: string | undefined;
  nombre: string | undefined; // Variable para el nombre
  apellido: string = ' '; // Variable para el apellido
  numero: number ;

  constructor(private location: Location) { 
    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(4)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(4)])
      // Otros controles aquí
      
    });
    this.nombre = '';
    this.apellido = ''; 
    this.numero = 0;
    
  }

  

  ngAfterViewInit(): void {
    //this.crearGrafico3D();
    this.createScatterPlot();
  }

  /*crearGrafico3D() {
    let width = 500, height = 500;
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    let svg = d3.select('#grafico3D').append('svg')
        .attr('width', width)
        .attr('height', height);

    let xScale = d3.scaleLinear([0, width]);
    let yScale = d3.scaleLinear([0, height]);
    let zScale = d3.scaleLinear([0, height]);

    let xRotate = 10;
    let yRotate = 10;
    let zRotate = 0;

    let data: any[] = [{x: 1, y: 2, z: 3},
                        {x: 4, y: 5, z: 6},
                        {x: 7, y: 8, z: 9},
                        {x: 10, y: 11, z: 12},
                        {x: 4, y: 4, z: 6},
                        {x: 7, y: 8, z: 5},
                        {x: 3, y: 11, z: 12},
                        {x: 4, y: 5, z: 2},
                        {x: 7, y: 8, z: 9},
                        {x: 10, y: 11, z: 12},
                        {x: 4, y:1, z: 6},
                        {x: 7, y: 0, z: 9},
                        {x: 10, y: 21, z: 12}];

    let plotData = (data: any[] | Iterable<unknown> | d3.ValueFn<SVGSVGElement, unknown, unknown[] | Iterable<unknown>>) => {
      let points = svg.selectAll('circle').data(data);
      points.enter()
          .append('circle')
          .attr('cx', (d:any) => xScale(d.x))
          .attr('cy', (d:any) => yScale(d.y))
          .attr('r', (d:any) => zScale(d.z))
          .style('fill', (d:any) => color(d.z));
    }

    plotData(data);
  }*/

  createScatterPlot() {
    const data = [
      {x: 30, y: 20, z: 10},
      {x: 40, y: 30, z: 20},
      {x: 50, y: 40, z: 30},
      // Agrega más datos aquí
    ];
    let width = 1000, height = 1000;
    const diag = d3.select('#grafico3D').attr('width', width)
    .attr('height', height);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x) || 0])
      .range([0, 500]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) || 0])
      .range([0, 500]);

    const zScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.z) || 0])
      .range([0, 500]);

    diag.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', d => zScale(d.z));
  }



  ngOnInit(): void {
    // Suscribirse a los cambios del campo nombre
    this.formGroup.get('nombre')?.valueChanges.subscribe(value => {
      // Aquí se puede hacer la validación del valor
      console.log(value);
      // Por ejemplo, si el valor tiene más de 10 letras, mostrar un mensaje
      if (value.length > 8) {
        alert('El nombre es muy largo');
      }
    });


      this.createScatterPlot();
  
  }

  
  onSubmit() {
    // Aquí se puede hacer algo con los datos del formulario
    console.log(this.formGroup.value);
    // Luego se escrollea hacia abajo el contenedor principal
    this.location.replaceState('/appCalculator/seccion2');
    window.scrollBy(0, window.innerHeight);
  }


  cargarCSV() {
    // Crear un elemento de tipo input file
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    // Agregar un evento que se dispare al cambiar el valor del input
    input.addEventListener('change', () => {
      // Obtener el archivo seleccionado
      if (input.files != null){
        let file = input.files[0];
      
      
      // Crear un lector de archivos
      let reader = new FileReader();
      // Leer el archivo como texto
      reader.readAsText(file);
    
      // Agregar un evento que se dispare al terminar la lectura
      reader.onload = () => {
        // Obtener el contenido del archivo como texto
        let csv = reader.result as string;
        this.csv = csv;
        // Mostrar el contenido en la consola
        console.log(csv);
      }
        // Aquí se puede hacer algo más con el contenido, como parsearlo o procesarlo
      };
    });
    // Simular un clic en el input para abrir el diálogo
    input.click();
  }

  

}