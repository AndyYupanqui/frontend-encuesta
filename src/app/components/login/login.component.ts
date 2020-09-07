import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  mayusculas = false;
  hide = true;

  loginForm = this.fb.group({
    correo: ['',
      [
        Validators.maxLength(40),
        Validators.required,
        Validators.email
      ]
    ],
    password: ['',
      [
        Validators.maxLength(30),
        Validators.required,
        Validators.minLength(4)
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
  ) {
  }

  get correo() { return this.loginForm.get('correo'); }

  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.password.hasError('required') ? 'La contraseña es obligatoria' :
      this.password.hasError('minlength') ? 'El mínimo de caracteres es: 4' :
        '';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire({
        type: 'error',
        title: 'Datos inválidos',
        text: 'Revise nuevamente y llene correctamente los campos.'
      });
      for (let i in this.loginForm.controls)
        this.loginForm.controls[i].markAsTouched();
      return;
    }

    if(this.loginForm.value.correo == "alejonc15@gmail.com" && this.loginForm.value.password == "123456"){
      localStorage.setItem('msgStartSession', 'true');
      localStorage.setItem('rol', 'usuario');
      this._router.navigate(['/home/general']);
    }
    else{
      if(this.loginForm.value.correo == "andyyupanqui@gmail.com" && this.loginForm.value.password == "123456"){
        localStorage.setItem('msgStartSession', 'true');
        localStorage.setItem('rol', 'administrador');
        this._router.navigate(['/home/preguntas']);
      }
      else{
        Swal.fire({
          type: 'error',
          title: 'Datos inválidos',
          text: 'Revise nuevamente y llene correctamente los campos.'
        });
      }
    }
  }

  detectaMayusculas(event) {
    if (event.getModifierState("CapsLock")) {
      this.mayusculas = true;
    } else {
      this.mayusculas = false;
    }
  }

}

