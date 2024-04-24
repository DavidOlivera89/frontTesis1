import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common'; // Importar ViewportScroller
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {

  scrollPosition: number; // Variable para la posición del scroll
  currentSection: number; // Variable para la sección actual

  constructor(private viewportScroller: ViewportScroller, private location: Location) { // Inyectar ViewportScroller y Location
    this.scrollPosition = 0; // Inicializar la posición del scroll en 0
    this.currentSection = 1; // Inicializar la sección actual en 1
  }

  ngOnInit(): void {
  }

  onScroll(event: Event) {
    // Obtener la posición actual del scroll
    let currentScrollPosition = this.viewportScroller.getScrollPosition()[1];
    // Comprobar si el scroll es hacia arriba o hacia abajo
    let scrollDirection = currentScrollPosition > this.scrollPosition ? 'down' : 'up';
    // Actualizar la variable de la posición del scroll
    this.scrollPosition = currentScrollPosition;
    // Comprobar si el scroll supera el umbral de cambio de sección
    let scrollThreshold = window.innerHeight / 2;
    // Si el scroll es hacia arriba y supera el umbral, retroceder una sección
    if (scrollDirection === 'up' && this.scrollPosition < scrollThreshold) {
      this.goBack();
    }
    // Si el scroll es hacia abajo y supera el umbral, no hacer nada
    if (scrollDirection === 'down' && this.scrollPosition > scrollThreshold) {
      // No avanzar a la siguiente sección
    }
  }

  goBack() {
    // Comprobar si hay una sección anterior
    if (this.currentSection > 1) {
      // Restar uno a la variable de la sección actual
      this.currentSection--;
      // Cambiar la URL según la sección actual
      this.location.replaceState(`/seccion${this.currentSection}`);
      // Escrollear hacia arriba el contenedor principal
      window.scrollBy(0, -window.innerHeight);
    }
  }

}