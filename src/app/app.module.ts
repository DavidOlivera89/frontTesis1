import { NgModule, Renderer2, RendererFactory2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Seccion1Component } from './seccion1/seccion1.component';
import { Seccion3Component } from './seccion3/seccion3.component';
import { Seccion4Component } from './seccion4/seccion4.component';
import { Seccion5Component } from './seccion5/seccion5.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { LoginComponent } from './login/login.component';
import { PersonalScreenComponent } from './personal-screen/personal-screen.component';
import { LogoComponent } from './logo/logo.component';
//import { SpinnerService } from './services/spinnerServices/spinner-service.service';

import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PdopChartComponent } from './pdop-chart/pdop-chart.component';


//plotly
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ScrollService } from './services/scrollService/scroll-service.service';
import { Seccion2Component } from './seccion2/seccion2.component';


PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    Seccion1Component,
    Seccion2Component,
    Seccion3Component,
    Seccion4Component,
    Seccion5Component,
    ContenedorComponent,
    LoginComponent,
    PersonalScreenComponent,
    LogoComponent,
    PdopChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    PlotlyModule 
    
  ],
  providers: [
    ScrollService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: Renderer2, useExisting: RendererFactory2,}
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
