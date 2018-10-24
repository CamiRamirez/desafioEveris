import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  public email: string;
  public password: string;

  constructor(public formBuilder: FormBuilder, public authService: AuthService, public snackBar: MatSnackBar) {
    this.createAuthForm();
   }

  ngOnInit() {
  }

  createAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  onRegister() {
    this.authService.signup(this.authForm.value.email, this.authForm.value.password)
      .then(value => {
        console.log('Se ha registrado con éxito', value);
      })
      .catch(() => {
        this.snackBar.open('Error de registro, trata otra vez'
          , null/*No necesitamos botón en el aviso*/
          , {
            duration: 3000
          });
      });
  }

  onLogin() {
    this.authService.login(this.authForm.value.email, this.authForm.value.password)
      .then(() => {
      })
      .catch(() => {
        this.snackBar.open('Error al tratar de iniciar sesión, trata otra vez'
          , null/*No necesitamos botón en el aviso*/
          , {
            duration: 3000
          });
      });
  }

  onLogout() {
    this.authService.logout()
      .then(() => {
      })
      .catch(() => {
        this.snackBar.open('Error al tratar de cerrar sesión, trata otra vez'
          , null/*No necesitamos botón en el aviso*/
          , {
            duration: 3000
          });
      });
  }

  onClickGoogleLogin() {
    this.authService.loginGoogle()
    .then((res) => {
      console.log('Autentificación con Google exitosa');
      console.log(res);
    }).catch(err => console.log(err.message));
  }

  onClickFacebookLogin() {
    this.authService.loginFacebook()
    .then((res) => {
      console.log(res);
    }).catch(err => console.log(err.message));
  }

}
