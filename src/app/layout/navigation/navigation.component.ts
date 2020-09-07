import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
export let browserRefresh = false;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [LoginService],
})
export class NavigationComponent implements OnInit {
  
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;

  rol: any;
  usuario: any;
  administrador: any;

  constructor(
    private _router: Router,
  ) {
    if (window.localStorage.getItem('msgStartSession') == 'true') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'success',
        title: 'Inicio de sesión correcto'
      })
    }
  }

  ngOnInit() {
    window.localStorage.setItem('msgStartSession', 'false');
    this.verificarAcceso();
    this.darAcceso();
  }

  verificarAcceso() {
    this.rol = window.localStorage.getItem('rol');
  }

  darAcceso() {
    if (this.rol == 'usuario') {
      this.usuario = true;
      this.administrador = false;
    }
    else {
      if (this.rol == 'administrador') {
        this.administrador = true;
        this.usuario = false;
      }
    }
  }

  logout() {
    window.localStorage.removeItem("token");
    localStorage.removeItem("rol");
    this._router.navigate(['']);
  }
}
