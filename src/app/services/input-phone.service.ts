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
    },
    {
      value: 'BO',
      label: 'Bolivia',
      code: '+591',
      flag: 'assets/flags-input-phone/flag-bo.svg',
    },
    {
      value: 'BR',
      label: 'Brasil',
      code: '+55',
      flag: 'assets/flags-input-phone/flag-br.svg',
    },
    {
      value: 'CA',
      label: 'Canadá',
      code: '+1',
      flag: 'assets/flags-input-phone/flag-ca.svg',
    },
    {
      value: 'CL',
      label: 'Chile',
      code: '+56',
      flag: 'assets/flags-input-phone/flag-cl.svg',
    },
    {
      value: 'CO',
      label: 'Colombia',
      code: '+57',
      flag: 'assets/flags-input-phone/flag-co.svg',
    },
    {
      value: 'CR',
      label: 'Costa Rica',
      code: '+506',
      flag: 'assets/flags-input-phone/flag-cr.svg',
    },
    {
      value: 'CU',
      label: 'Cuba',
      code: '+53',
      flag: 'assets/flags-input-phone/flag-cu.svg',
    },
    {
      value: 'EC',
      label: 'Ecuador',
      code: '+593',
      flag: 'assets/flags-input-phone/flag-ec.svg',
    },
    {
      value: 'SV',
      label: 'El Salvador',
      code: '+503',
      flag: 'assets/flags-input-phone/flag-sv.svg',
    },
    {
      value: 'US',
      label: 'Estados Unidos',
      code: '+1',
      flag: 'assets/flags-input-phone/flag-us.svg',
    },
    {
      value: 'GT',
      label: 'Guatemala',
      code: '+502',
      flag: 'assets/flags-input-phone/flag-gt.svg',
    },
    {
      value: 'HT',
      label: 'Haití',
      code: '+509',
      flag: 'assets/flags-input-phone/flag-ht.svg',
    },
    {
      value: 'HN',
      label: 'Honduras',
      code: '+504',
      flag: 'assets/flags-input-phone/flag-hn.svg',
    },
    {
      value: 'MX',
      label: 'México',
      code: '+52',
      flag: 'assets/flags-input-phone/flag-mx.svg',
    },
    {
      value: 'NI',
      label: 'Nicaragua',
      code: '+505',
      flag: 'assets/flags-input-phone/flag-ni.svg',
    },
    {
      value: 'PA',
      label: 'Panamá',
      code: '+507',
      flag: 'assets/flags-input-phone/flag-pa.svg',
    },
    {
      value: 'PY',
      label: 'Paraguay',
      code: '+595',
      flag: 'assets/flags-input-phone/flag-py.svg',
    },
    {
      value: 'PE',
      label: 'Perú',
      code: '+51',
      flag: 'assets/flags-input-phone/flag-pe.svg',
    },
    {
      value: 'DO',
      label: 'República Dominicana',
      code: '+1',
      flag: 'assets/flags-input-phone/flag-do.svg',
    },
    {
      value: 'UY',
      label: 'Uruguay',
      code: '+598',
      flag: 'assets/flags-input-phone/flag-uy.svg',
    },
    {
      value: 'VE',
      label: 'Venezuela',
      code: '+58',
      flag: 'assets/flags-input-phone/flag-ve.svg',
    },
    {
      value: 'ES',
      label: 'España',
      code: '+34',
      flag: 'assets/flags-input-phone/flag-es.svg',
    },
    {
      value: 'FR',
      label: 'Francia',
      code: '+33',
      flag: 'assets/flags-input-phone/flag-fr.svg',
    },
    {
      value: 'IT',
      label: 'Italia',
      code: '+39',
      flag: 'assets/flags-input-phone/flag-it.svg',
    },
    {
      value: 'PT',
      label: 'Portugal',
      code: '+351',
      flag: 'assets/flags-input-phone/flag-pt.svg',
    },
  ];

  constructor() {}
}

interface Country {
  value: string;
  label: string;
  code: string;
  flag: string;
}
