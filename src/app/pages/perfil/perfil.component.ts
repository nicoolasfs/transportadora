import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  public cerrarSesion(): void {
    if(confirm("Desea salir del aplicativo?")){
      this.loginService.closeSession();
    }
  }
}
