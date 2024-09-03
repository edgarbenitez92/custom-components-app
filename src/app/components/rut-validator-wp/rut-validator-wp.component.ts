import { Component } from '@angular/core';
import { RutPipe } from '../../shared/pipes/rut.pipe';

@Component({
  selector: 'app-rut-validator-wp',
  standalone: true,
  imports: [RutPipe],
  templateUrl: './rut-validator-wp.component.html',
  styleUrl: './rut-validator-wp.component.scss',
})
export class RutValidatorWpComponent {
  userRut: string = '463214735';
}
