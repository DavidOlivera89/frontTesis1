import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'personal-screen',
  templateUrl: './personal-screen.component.html',
  styleUrls: ['./personal-screen.component.css']
})
export class PersonalScreenComponent  implements AfterViewInit {
  @ViewChild('miModal') miModal!: ElementRef;
  @ViewChild('abrirModal') abrirModal!: ElementRef;
  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  location: any;
  nombreProyecto: string | undefined;
  //router: any;
  formGroup: any;
  rtaModal: Boolean = true;
  verSidebar= false;

  constructor( private router: Router) { 
    this.formGroup = new FormGroup({
      nombreProyecto: new FormControl('', [Validators.required, Validators.minLength(4)]),
      
    });
    this.nombreProyecto = '';
  }

  ngAfterViewInit() {
    if (this.abrirModal && this.abrirModal.nativeElement) {
      this.abrirModal.nativeElement.onclick = () => {
        if (this.miModal && this.miModal.nativeElement) {
          this.miModal.nativeElement.style.display = "flex";
        }
      }
    }

    if (this.cerrarModal && this.cerrarModal.nativeElement) {
      this.cerrarModal.nativeElement.onclick = () => {
        if (this.miModal && this.miModal.nativeElement) {
          this.miModal.nativeElement.style.display = "none";
        }
      }
    }

    window.onclick = (event) => {
      if (event.target == this.miModal?.nativeElement) {
        this.miModal.nativeElement.style.display = "none";
      }
    }
  }


  cancelarCalculo(){
    this.rtaModal = false;
    this.miModal.nativeElement.style.display = "none";
    this.router.navigate(['/personal-screen']);

  }

  
  continuarCalculo(){
    this.rtaModal = true;
    console.log("se deben almacenar los calculos");
    
    this.miModal.nativeElement.style.display = "none";
    //this.location.replaceState('/appCalculator');

    if (this.rtaModal){
    this.router.navigate(['/appCalculator']);
    }
  }

  verSidebarra(){
    this.verSidebar=!this.verSidebar;
  }
}