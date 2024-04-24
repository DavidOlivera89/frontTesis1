import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { Seccion1Component } from './seccion1/seccion1.component';
import { Seccion2Component } from './seccion2/seccion2.component';
import { Seccion3Component } from './seccion3/seccion3.component';
import { Seccion4Component } from './seccion4/seccion4.component';
import { Seccion5Component } from './seccion5/seccion5.component';
import { LoginComponent } from './login/login.component';
import { PersonalScreenComponent } from './personal-screen/personal-screen.component';
import { AuthGuard } from './services/auth/auth.guard';  
import { PdopChartComponent } from './pdop-chart/pdop-chart.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'login', component: LoginComponent }, // Ruta del login
  { path: 'pruebaGrafico', component: PdopChartComponent }, //
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'personal-screen', component: PersonalScreenComponent , canActivate: [AuthGuard]},
  {
    path: 'appCalculator',
    component: ContenedorComponent,
    children: [
      /* { path: 'seccion1', component: Seccion1Component , canActivate: [AuthGuard]}, */
      { path: 'seccion2', component: Seccion2Component , canActivate: [AuthGuard] },
      { path: 'seccion3', component: Seccion3Component , canActivate: [AuthGuard]  },
      { path: 'seccion4', component: Seccion4Component , canActivate: [AuthGuard] },
      { path: 'seccion5', component: Seccion5Component , canActivate: [AuthGuard] },
      { path: '', redirectTo: 'seccion2', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }