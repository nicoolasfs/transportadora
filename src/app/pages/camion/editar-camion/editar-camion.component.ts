import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/_share/mensajes';
@Component({
  selector: 'app-editar-camion',
  templateUrl: './editar-camion.component.html',
  styleUrls: ['./editar-camion.component.css']
})
export class EditarCamionComponent implements OnInit {
  
  public selectedTipo: any;
  public selectedMarca!: string;

  form!: FormGroup;

  vehicle: Vehiculo = new Vehiculo();

  veh: any;

  constructor(private VehService: VehiculoService, private formBuilder: FormBuilder, 
              public errorInterceptor: ErrorInterceptorService, private router: Router, 
              private route: ActivatedRoute, private mensaje : Mensajes) {
      this.buildForm();
    }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
      let idVehiculo = params.idCamion;
      this.cargarVehiculo(idVehiculo);
    });
  }

  cargarVehiculo(idVehiculo: number): void{
    this.VehService.listar(idVehiculo).subscribe(data => {
      this.veh = data;
    });
  }

  editarVehiculo(event: Event): void{
    event.preventDefault();

    const v: Vehiculo = new Vehiculo();

    v.idVehiculo = this.veh.idVehiculo;
    v.placa = this.form.value.placa;
    v.marca = this.form.value.marca;
    v.modelo = this.form.value.modelo;
    v.tipoVehiuclo = this.form.value.tipoVehiculo;
    v.capacidad = this.form.value.capacidad;

    if (this.form.valid)
    {
      this.VehService.editar(v).subscribe(success => {
        this.mensaje.openSnackBar('Vehiculo Editado');
        this.router.navigate(['/camion']);
        this.form.reset();
      }, err => {
        this.mensaje.openSnackBar('Error al editar vehiculo, intente mas tarde');
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        idVehiculo: ['', []],
        placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        marca: ['', [Validators.required]],
        modelo: ['', [Validators.required, Validators.min(1970), Validators.max(2022)]],
        tipoVehiculo: ['', [Validators.required]],
        capacidad: ['', [Validators.required]],
      });

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
}