import { Component } from '@angular/core';
import { OnlyRutDirective } from '../../shared/directives/only-rut.directive';

@Component({
  selector: 'app-rut-validator-wd',
  standalone: true,
  imports: [OnlyRutDirective],
  templateUrl: './rut-validator-wd.component.html',
  styleUrl: './rut-validator-wd.component.scss',
})
export class RutValidatorWdComponent {
  rut: string = '342240747';
}
