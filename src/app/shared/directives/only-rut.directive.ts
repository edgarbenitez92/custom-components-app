import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { RutService } from '../../services/rut.service';

@Directive({
  selector: '[appOnlyRut]',
  standalone: true,
})
export class OnlyRutDirective {
  private elementRef = inject(ElementRef);
  private rutService = inject(RutService);

  constructor() {}

  @HostListener('input')
  onInput() {
    const value = this.elementRef.nativeElement.value;
    const chars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'k',
      'K',
      '.',
      '-',
    ];
    const aux: string[] = [];

    value.split('').forEach((char: string) => {
      if (chars.indexOf(char) !== -1) aux.push(char);
    });

    this.elementRef.nativeElement.value = aux.join('');
  }

  @HostListener('blur')
  onBlur() {
    const rutValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = this.rutService.format(rutValue);
  }
}
