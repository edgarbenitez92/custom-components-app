import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RutService } from '../../services/rut.service';
import { OnlyRutDirective } from '../../shared/directives/only-rut.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-rut-validator-form',
  standalone: true,
  imports: [ReactiveFormsModule, OnlyRutDirective, NgIf],
  templateUrl: './rut-validator-form.component.html',
  styleUrl: './rut-validator-form.component.scss',
})
export class RutValidatorFormComponent {
  private formBuilder = inject(FormBuilder);
  private rutService = inject(RutService);

  rutValidatorForm: FormGroup<RutForm>;

  constructor() {
    this.rutValidatorForm = this.formBuilder.nonNullable.group({
      rut: ['', [Validators.required, this.rutService.rutValidator()]],
    });
  }

  get rutField(): AbstractControl | null {
    return this.rutValidatorForm.controls['rut'];
  }

  get rutErrorMessage(): string {
    if (this.rutValidatorForm.touched && this.rutField?.hasError('required')) {
      return 'RUT field is required!';
    }

    if (this.rutField?.hasError('invalidRut')) {
      return 'RUT is not valid!';
    }

    return '';
  }
}

interface RutForm {
  rut: FormControl<string>;
}
