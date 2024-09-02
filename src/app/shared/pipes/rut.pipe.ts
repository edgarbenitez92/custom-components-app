import { Pipe, PipeTransform } from '@angular/core';
import { rutFormat } from '../utils/ValidateRut';

@Pipe({
  name: 'rut',
  standalone: true,
})
export class RutPipe implements PipeTransform {
  transform(value: string): string {
    return rutFormat(value);
  }
}
