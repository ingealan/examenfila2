import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { MensajeService } from '../../services/mensaje.service';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';
import { CargarService } from '../../services/cargar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // necesario para ngModel
import { HttpClientModule } from '@angular/common/http'; // 💥 IMPORTANTE
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-formu',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, HttpClientModule],
  providers: [CargarService, MensajeService],
  templateUrl: './formu.component.html',
  styleUrl: './formu.component.css'
})
export class FormuComponent {
  public formu: Mensaje;
  public archivosParaCargar: Array<File> = [];
  public status: string;
  public url: string;

  constructor(
    private _mensajeService: MensajeService,
    private _cargarService: CargarService
  ) {
    this.url = Global.url;
    this.formu = new Mensaje('', '', '', '', '');
    this.status = '';
  }

  imagenChangeEvent(event: any) {
    this.archivosParaCargar = <Array<File>>event.target.files;
  }

  guardarMensaje(form: NgForm) {
    this._mensajeService.guardarMensaje(this.formu).subscribe(
      response => {
        if (response.mensaje) {
          if (this.archivosParaCargar.length > 0) {
            this._cargarService.peticionRequest(
              this.url + "subir-imagen-mensaje/" + response.mensaje._id,
              [],
              this.archivosParaCargar,
              'imagen'
            ).then((result: any) => {
              this.formu = result.mensaje;
              this.status = 'success';
              form.reset();
              this.archivosParaCargar = [];
            });
          } else {
            this.status = 'success';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }
}
