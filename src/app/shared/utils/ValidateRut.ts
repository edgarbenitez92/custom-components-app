export function rutValidate(rut: string): boolean {
  if (!rut || typeof rut !== 'string') return false;

  const cleanedRut = rut.replace(/\./g, '').replace(/-/g, '');

  if (cleanedRut.length < 2) return false;

  const body = cleanedRut.slice(0, -1);
  const verifier = cleanedRut.slice(-1).toUpperCase();

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  const calculatedVerifier =
    remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();

  return verifier === calculatedVerifier;
}

export function rutFormat(rut: string): string {
  const cleanedRut = rutClean(rut);
  if (cleanedRut.length < 2) return rut;

  let formattedRut =
    cleanedRut.slice(-4, -1) +
    '-' +
    cleanedRut.substring(cleanedRut.length - 1);

  for (let i = 4; i < cleanedRut.length; i += 3) {
    formattedRut = cleanedRut.slice(-3 - i, -i) + '.' + formattedRut;
  }

  return formattedRut;
}

export function rutClean(rut: string): string {
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}
