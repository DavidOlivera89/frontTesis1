import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Importa Router
import { tap }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  private _loginUrl = "https://apitesis-production.up.railway.app//login";
  //private _loginUrl = "https://apitesis-production.up.railway.app/login";

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(username: string, password: string) {
    return this.http.post(this._loginUrl, {username, password})
      .pipe( tap(() => this.isLoggedIn = true)
      );
/*     return this.http.post(this._loginUrl, {username, password}).subscribe(
      (data: any) => {
        // Si el inicio de sesión es exitoso y recibe un token, redirige al usuario
        if (data['token']) {
          console.log(data['token'] );
          console.log(data['user'] );
          this.router.navigate(['/personal-screen']);  
        }else{
          console.log(data['message'] );
        }
        
      },
      error => {
        // Maneja el error aquí. Por ejemplo, puedes asignar el mensaje de error a una variable que luego se muestre en tu componente.
        console.log('no se ha podido loguear');
       
        console.error(error);
      }
    ); */
  }

  checkTokenAndUser(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    // Aquí debes implementar la lógica para verificar si el token y el usuario son válidos
    if (token && user) {
      // Si el token y el usuario son válidos, redirige al usuario a la siguiente pantalla
      this.isLoggedIn = true;
      this.router.navigate(['/personal-screen']);
    }
  }


  logout() {
    this.isLoggedIn = false;
    // todo conectar al logout de la api
  }
}