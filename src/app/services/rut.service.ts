import { Injectable } from '@angular/core';
import { rutClean, rutFormat, rutValidate } from '../shared/utils/ValidateRut';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

  rutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;

      if (!rut) return null;

      return rutValidate(rut) ? null : { invalidRut: { value: rut } };
    };
  }
}
