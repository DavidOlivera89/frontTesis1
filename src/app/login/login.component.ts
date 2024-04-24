import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerService } from '../services/spinnerService/spinner-service.service';
//import { LoginService } from './login.service'; // Servicio que se encarga de la autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // usuario y la contraseña
  username: string | undefined;
  password: string | undefined;
  //router: any;
  formGroup: any;
  data: any;
  mensaje: string | undefined;
  errormsg: Boolean | undefined = false;

  constructor(private location: Location , private _auth: AuthService, private router: Router, public spinnerService: SpinnerService) { 
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
      
      // Otros controles aquí
      
    });
    this.username = '';
    this.password = '';
    let token = localStorage.getItem('token');
    if (token && token.length > 20) {
        this.router.navigate(['/personal-screen']);
    }
    
  }

  // Inyectar el router y el servicio de login en el constructor
  //constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this._auth.checkTokenAndUser();
    /*const token = localStorage.getItem('token');
    if (token ) {
        
        this.router.navigate(['/personal-screen']);
    }else{
      console.log("No hay cargado token");
    }*/
    
    // Suscribirse a los cambios del campo nombre
    this.formGroup.get('username')?.valueChanges.subscribe((value: string | any[]) => {
      // Aquí se puede hacer la validación del valor
      console.log(value);

      
      // Por ejemplo, si el valor tiene más de 10 letras, mostrar un mensaje
      /*if (value.length > 8) {
        alert('El nombre es muy largo');
      }*/

    });
  }

    
  loginUser() {
    this.spinnerService.show();
    this.errormsg = false; 
    
    this._auth.loginUser(this.formGroup.value.username, this.formGroup.value.password).subscribe(
      (data: any) => {
        // Si el inicio de sesión es exitoso y recibe un token, redirige al usuario
        if (data['token']) {
          console.log(data['token'] );
          console.log(data['user'] );
          localStorage.setItem('token', data['token']);
          localStorage.setItem('user', data['user'].username);
          this._auth.isLoggedIn = true;

          this.router.navigate(['/personal-screen']);       // BORRAR EL COMENTARIO ESTA ES LA LINEA QUE TIENE QUE IR
          //this.router.navigate(['/pruebaGrafico']);  //todo revisar para despues ese grafico


        } else {
          this.spinnerService.hide();
          this.errormsg = true; 
          this.mensaje = data['message'];
        }
      },
      error => {
        // Manejar el error aca mostrar el mensaje de error en la variable
        this.spinnerService.hide();
        this.errormsg = true; 
        this.mensaje = "Lo sentimos, ha ocurrido un error en el navegador";
      }
    );
    
  
  }

}