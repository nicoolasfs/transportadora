import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_model/Usuario';
import { Departamento } from 'src/app/_model/Departamento';
import { Ciudades } from 'src/app/_model/Ciudades';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/_share/mensajes';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-editar-conductor',
  templateUrl: './editar-conductor.component.html',
  styleUrls: ['./editar-conductor.component.css']
})
export class EditarConductorComponent implements OnInit {

  form!: FormGroup;
  departamento !: Departamento[];
  ciudades !: Ciudades[];
  conductor : any;
  
  constructor(private userService: UsuarioService, private deptoService: DepartamentoService, private formBuilder: FormBuilder,
    public errorInterceptor: ErrorInterceptorService, private router: Router,
    private route: ActivatedRoute, private mensaje: Mensajes) {
      this.buildForm();
     }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
      let idUsuario = params.idConductor;
      this.cargarConductor(idUsuario);
      this.listarDepartamentos();
    });
  }

  listarDepartamentos(){
    this.deptoService.listar().subscribe((data: Departamento[]) => {
      this.departamento = data;
    });
  }
  listarCiudades(value: any) {
      this.deptoService.listarCiudades(value).subscribe((data: Ciudades[]) => {
      this.ciudades = data;
    });
  }

  cargarConductor(idUsuario: number): void{
  this.userService.listar(idUsuario).subscribe(data => {
      this.conductor = data;
      this.listarCiudades(this.conductor.ciudad.departamento.idDepartamento);
    });
  }

  editarUsuario(event: Event): void {
    event.preventDefault();

    const u: Usuario = new Usuario();

    u.idUsuario = this.conductor.idUsuario;
    u.nombre = this.form.value.nombre;
    u.apellido = this.form.value.apellido;
    u.nick = this.form.value.nick;
    u.documento = this.form.value.documento;
    u.correo = this.form.value.correo;
    u.clave = this.form.value.clave;
    u.direccion = this.form.value.direccion;
    u.celular = this.form.value.celular;
    u.celularAux = this.form.value.celularAux;
    u.tipoDocumento = {
      idTipoDocumento: 1
    };
    u.rol = {
      idRol: 4
    };
    u.ciudad = {
      idCiudad: this.form.value.ciudad,
      nombre : '',
      departamento : {
        idDepartamento : this.form.value.departamento,
        nombre : ''
      }
    };
    
    if (this.form.valid) {
      this.userService.editar(u).subscribe(success => {
        this.mensaje.openSnackBar('Usuario Editado');
        this.form.reset();
        this.router.navigate(['/conductor']);
      }, err => {
        this.mensaje.openSnackBar('Error, No se actualizo');
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        idUsuario: ['', []],
        nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
        apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
        nick: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
        correo: ['', [Validators.required, Validators.minLength(8), Validators.email]],
        clave: ['', [Validators.minLength(6), Validators.maxLength(16)]],
        direccion: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
        celularAux: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
        departamento: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
      });
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input
    }
  }
  public inputValidatorNum(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      // invalid character, prevent input
    }
  }
  public inputValidatorEmail(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/g, "");
      // invalid character, prevent input
    }
  }

}
