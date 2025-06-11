import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {
  proyectos = [
    {
      titulo: 'Proyecto Pulsaciones',
      fecha: 'Lun, Jun 17 2025',
      fechaISO: '2025-06-17',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius!',
      etiqueta: 'D.S 1',
      tipo: 'Vinculacion',
      color: 'blue',
      imagen: 'https://picsum.photos/1000/1000'
    },
    {
      titulo: 'Proyecto Desarrollo 2',
      fecha: 'Lun, May 25 2020',
      fechaISO: '2020-05-25',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius!',
      etiqueta: 'D.S 1',
      tipo: 'Vinculacion',
      color: 'red',
      imagen: 'https://picsum.photos/501/500'
    },
    {
      titulo: 'Proyecto Desarrollo 3',
      fecha: 'Lun, May 25 2020',
      fechaISO: '2020-05-25',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius!',
      etiqueta: 'D.S 3',
      tipo: 'Vinculacion',
      color: 'green',
      imagen: 'https://picsum.photos/500/501'
    },
    {
      titulo: 'Proy 4',
      fecha: 'Lun, May 25 2020',
      fechaISO: '2020-05-25',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius!',
      etiqueta: 'D.S 4',
      tipo: 'Vinculacion',
      color: 'yellow',
      imagen: 'https://picsum.photos/501/501'
    }
  ];
}
