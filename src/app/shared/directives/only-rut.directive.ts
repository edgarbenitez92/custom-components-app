import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { RutService } from '../../services/rut.service';

@Directive({
  selector: '[onlyRut]',
  standalone: true,
})
export class OnlyRutDirective {
  private elementRef = inject(ElementRef);
  private rutService = inject(RutService);

  constructor() {}

  ngOnInit() {
    this.formatRut();
  }

  @HostListener('focus')
  onFocus() {
    this.cleanRut();
  }

  @HostListener('input')
  onInput() {
    this.sanitizeRutInput();
  }

  @HostListener('blur')
  onBlur() {
    this.formatRut();
  }

  private cleanRut(): void {
    const rutValue = this.elementRef.nativeElement.value;
    const cleanedRut = this.rutService.clean(rutValue);
    this.elementRef.nativeElement.value = cleanedRut;
  }

  private sanitizeRutInput(): void {
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

  private formatRut(): void {
    const rutValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = this.rutService.format(rutValue);
  }
}
