import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { CamionComponent } from './pages/camion/camion.component';
import { EditarComponent } from './pages/editar/editar.component';
import { RegistrarCamionComponent } from './pages/camion/registrar-camion/registrar-camion.component';
import { EditarCamionComponent } from './pages/camion/editar-camion/editar-camion.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'pedido', component: PedidoComponent},
  {path: 'conductor', component: ConductorComponent},
  {path: 'camion', component: CamionComponent, children: [
    {path: 'registrar-camion', component: RegistrarCamionComponent},
    {path: 'editar-camion/:idCamion', component: EditarCamionComponent}
  ]},
  {path: 'departamento', component: DepartamentoComponent, children:[
    {path: 'ciudad/:idDep', component: CiudadComponent}
  ]},
  {path: 'editar', component: EditarComponent},
  {path: 'error', component: NotOkComponent},
  {path: 'notAllowed', component: NotAllowedComponent},
  {path: '**', component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
