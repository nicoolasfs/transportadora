import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  
  displayedColumns: string[] = ['idDepartamento', 'nombre', 'ver'];
  dataSource = new MatTableDataSource<Departamento>();

  @ViewChild("DepartmentPaginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private departamentoService: DepartamentoService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.departamentoService.listar().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
}
filtrar(event: Event) {
  const filtro = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filtro.trim().toLowerCase();
} 
}