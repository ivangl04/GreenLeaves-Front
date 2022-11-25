import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ApiService } from '../services/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CiudadDTO } from '../models/CiudadDTO.model';
import { ContactoDTO } from '../models/ContactoDTO.model';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Green Leaves';
  @ViewChild('inputNombre') inputNombre: ElementRef;
  @ViewChild('inputEmail') inputEmail: ElementRef;
  @ViewChild('inputTelefono') inputTelefono: ElementRef;
  @ViewChild('inputFecha') inputFecha: ElementRef;
  @ViewChild('inputCiudad') inputCiudad: ElementRef;
  showMessage = false;
  ciudadesOpciones: string[];
  autocompleteControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  contacto: ContactoDTO = {
    email: '123@gmail.com',
    isoCiudad: '050',
    fecha: undefined,
    nombre:'ivan',
    telefono:'5646321',
    id: 0
  };

  constructor(
    public dialog: MatDialog,
    private _apiService: ApiService,){ 
      
  }

  ngOnInit(){
    this.getCiudades();
    
  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.ciudadesOpciones.filter(option => option.toLowerCase().includes(filterValue));
  }

  validateEmail(email: string) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  validatePhoneNumber(phone: string)
  {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phone.match(phoneno))
    {
    return true;
    }
    else
    {
      return false;
    }
  }

  sendData() {
    if(this.inputNombre.nativeElement.value == null || this.inputNombre.nativeElement.value == '')
    {

      console.log(1);
      this.openDialog('Ingrese un Nombre valido');
      return;
    }
    else
    {
        this.contacto.nombre = this.inputNombre.nativeElement.value;
    }
    if(this.validateEmail(this.inputEmail.nativeElement.value) != undefined)
    {
     this.contacto.email = this.inputEmail.nativeElement.value;
    }
    else
    {
      
      console.log(2);
      this.openDialog('Ingrese un Email valido');
      return;
    }
    if(this.validatePhoneNumber(this.inputTelefono.nativeElement.value) != false)
    {
     this.contacto.telefono = this.inputTelefono.nativeElement.value;
    }
    else
    {
      
      console.log(3);
      this.openDialog('Ingrese un Telefono valido');
      return;
    }
    if(this.autocompleteControl.value == null || this.autocompleteControl.value == '')
    {
      
      console.log(4);
      this.openDialog('Ingrese una Ciudad valida');
      return;
    }
    else
    {
      this.contacto.isoCiudad = this.autocompleteControl.value != null ? this.autocompleteControl.value : "";
    }
    //his.contacto.fecha = moment(new Date(this.inputFecha.nativeElement.value)).format('ddMMyyyy')
    this.postContacto(this.contacto);
  }

  openDialog(message: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const config: MatDialogConfig = {
      direction: "ltr",
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '250px',
      height: '250px',
      position: {
          top: '100',
          left: '100'
      },
      panelClass:'makeItMiddle', //Class Name that can be defined in styles.css as follows:
      data: message,
  };

   const dialogRef = this.dialog.open(ConfirmDialogComponent,
    config
  //   {
  //   width: '250px',
  //   data: {name: 'this.name', animal: 'this.animal'},
  // }
  );
   dialogRef.afterClosed().subscribe(
    res => {
      console.log(res);
    }
   );
}

 getCiudades()
 {
  console.log('resultadoa');
  this._apiService.getCiudades().toPromise()
  .then((resp: any) => {
    console.log('resultado');
    console.log(resp);
    this.ciudadesOpciones = resp;

    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  })
  .catch((e: HttpErrorResponse) => {
      if (e.status === 404) {
         
      } else {
          
      }
      console.log(e);
  });
 }


 getCiudad(ciudad: string)
 {
  console.log('resultadoa');
  this._apiService.getCiudad(ciudad).toPromise()
  .then((resp: any) => {
    console.log('resultado');
    console.log(resp);
  })
  .catch((e: HttpErrorResponse) => {
      if (e.status === 404) {
         
      } else {
          
      }
      console.log(e);
  });
 }
 
 postContacto(contacto: ContactoDTO)
 {
  console.log('contacto');
  this._apiService.postContacto(contacto).toPromise()
  .then((resp: any) => {
    console.log('resultado');
    console.log(resp);
    if(resp.id != undefined)
    {
      this.showMessage = true;
    }
  })
  .catch((e: HttpErrorResponse) => {
      if (e.status === 404) {
         
      } else {
          
      }
      console.log(e);
  });
 }

}



