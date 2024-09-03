import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputPhoneService {
  countries: Country[] = [
    {
      value: 'AR',
      label: 'Argentina',
      code: '+54',
      flag: 'assets/flags-input-phone/flag-ar.svg',
      phoneFormat: '(11) 1234-5678',
    },
    {
      value: 'BO',
      label: 'Bolivia',
      code: '+591',
      flag: 'assets/flags-input-phone/flag-bo.svg',
      phoneFormat: '7 1234-567',
    },
    {
      value: 'BR',
      label: 'Brasil',
      code: '+55',
      flag: 'assets/flags-input-phone/flag-br.svg',
      phoneFormat: '(11) 12345-6789',
    },
    {
      value: 'CA',
      label: 'Canadá',
      code: '+1',
      flag: 'assets/flags-input-phone/flag-ca.svg',
      phoneFormat: '(416) 123-4567',
    },
    {
      value: 'CL',
      label: 'Chile',
      code: '+56',
      flag: 'assets/flags-input-phone/flag-cl.svg',
      phoneFormat: '(2) 2123-4567',
    },
    {
      value: 'CO',
      label: 'Colombia',
      code: '+57',
      flag: 'assets/flags-input-phone/flag-co.svg',
      phoneFormat: '(1) 123-4567',
    },
    {
      value: 'CR',
      label: 'Costa Rica',
      code: '+506',
      flag: 'assets/flags-input-phone/flag-cr.svg',
      phoneFormat: '2123-4567',
    },
    {
      value: 'CU',
      label: 'Cuba',
      code: '+53',
      flag: 'assets/flags-input-phone/flag-cu.svg',
      phoneFormat: '7 123-4567',
    },
    {
      value: 'EC',
      label: 'Ecuador',
      code: '+593',
      flag: 'assets/flags-input-phone/flag-ec.svg',
      phoneFormat: '2-123-4567',
    },
    {
      value: 'SV',
      label: 'El Salvador',
      code: '+503',
      flag: 'assets/flags-input-phone/flag-sv.svg',
      phoneFormat: '2123-4567',
    },
    {
      value: 'US',
      label: 'Estados Unidos',
      code: '+1',
      flag: 'assets/flags-input-phone/flag-us.svg',
      phoneFormat: '(202) 123-4567',
    },
    {
      value: 'GT',
      label: 'Guatemala',
      code: '+502',
      flag: 'assets/flags-input-phone/flag-gt.svg',
      phoneFormat: '2123-4567',
    },
    {
      value: 'HT',
      label: 'Haití',
      code: '+509',
      flag: 'assets/flags-input-phone/flag-ht.svg',
      phoneFormat: '22 12 3456',
    },
    {
      value: 'HN',
      label: 'Honduras',
      code: '+504',
      flag: 'assets/flags-input-phone/flag-hn.svg',
      phoneFormat: '2123-4567',
    },
    {
      value: 'MX',
      label: 'México',
      code: '+52',
      flag: 'assets/flags-input-phone/flag-mx.svg',
      phoneFormat: '55 1234-5678',
    },
    {
      value: 'NI',
      label: 'Nicaragua',
      code: '+505',
      flag: 'assets/flags-input-phone/flag-ni.svg',
      phoneFormat: '2123-4567',
    },
    {
      value: 'PA',
      label: 'Panamá',
      code: '+507',
      flag: 'assets/flags-input-phone/flag-pa.svg',
      phoneFormat: '212-3456',
    },
    {
      value: 'PY',
      label: 'Paraguay',
      code: '+595',
      flag: 'assets/flags-input-phone/flag-py.svg',
      phoneFormat: '21 123 456',
    },
    {
      value: 'PE',
      label: 'Perú',
      code: '+51',
      flag: 'assets/flags-input-phone/flag-pe.svg',
      phoneFormat: '(01) 123-4567',
    },
    {
      value: 'DO',
      label: 'República Dominicana',
      code: '+1',
      flag: 'assets/flags-input-phone/flag-do.svg',
      phoneFormat: '(809) 123-4567',
    },
    {
      value: 'UY',
      label: 'Uruguay',
      code: '+598',
      flag: 'assets/flags-input-phone/flag-uy.svg',
      phoneFormat: '2 123 4567',
    },
    {
      value: 'VE',
      label: 'Venezuela',
      code: '+58',
      flag: 'assets/flags-input-phone/flag-ve.svg',
      phoneFormat: '212-1234567',
    },
    {
      value: 'ES',
      label: 'España',
      code: '+34',
      flag: 'assets/flags-input-phone/flag-es.svg',
      phoneFormat: '612 34 56 78',
    },
    {
      value: 'FR',
      label: 'Francia',
      code: '+33',
      flag: 'assets/flags-input-phone/flag-fr.svg',
      phoneFormat: '01 23 45 67 89',
    },
    {
      value: 'IT',
      label: 'Italia',
      code: '+39',
      flag: 'assets/flags-input-phone/flag-it.svg',
      phoneFormat: '06 1234 5678',
    },
    {
      value: 'PT',
      label: 'Portugal',
      code: '+351',
      flag: 'assets/flags-input-phone/flag-pt.svg',
      phoneFormat: '212 345 678',
    },
  ];

  constructor() {}
}

interface Country {
  value: string;
  label: string;
  code: string;
  flag: string;
  phoneFormat: string;
}
