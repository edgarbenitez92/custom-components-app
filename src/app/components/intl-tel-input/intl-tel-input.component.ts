import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPhoneService } from '../../services/input-phone.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-intl-tel-input',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './intl-tel-input.component.html',
  styleUrl: './intl-tel-input.component.scss',
})
export class IntlTelInputComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  inputPhoneService = inject(InputPhoneService);

  selectedCountry!: Country;
  countries: Country[] = [];
  phoneNumber: string = '';
  searchTerm: string = '';
  isOpen: boolean = false;

  phoneNumberControl = new FormControl('');

  constructor() {
    this.setDefaultData();
  }

  ngOnInit(): void {
    this.subsFormValues();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  setDefaultData(): void {
    this.countries = this.inputPhoneService.countries;
    this.selectedCountry = this.countries.find(
      (country) => country.value === 'CL'
    )!;
  }

  subsFormValues(): void {
    this.phoneNumberControl.valueChanges.subscribe((value) => {
      if (value) {
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        if (sanitizedValue !== value) {
          this.phoneNumberControl.setValue(sanitizedValue, {
            emitEvent: false,
          });
        }
      }
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.isOpen = false;
    this.searchTerm = '';
  }

  filterCountries(): Country[] {
    return this.countries.filter(
      (country) =>
        country.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        country.code.includes(this.searchTerm)
    );
  }

  handlePhoneChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.phoneNumber = input.value.replace(/[^0-9]/g, '');
  }
}

interface Country {
  value: string;
  label: string;
  code: string;
  flag: string;
}
