import { Injectable } from '@angular/core';
import { rutClean, rutFormat, rutValidate } from '../shared/utils/ValidateRut';

@Injectable({
  providedIn: 'root',
})
export class RutService {
  constructor() {}

  validate(rut: string): boolean {
    return rutValidate(rut);
  }

  format(rut: string): string {
    return rutFormat(rut);
  }

  clean(rut: string): string {
    return rutClean(rut);
  }
}
