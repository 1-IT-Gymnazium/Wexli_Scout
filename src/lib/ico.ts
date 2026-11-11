// IČO má 8 číslic; poslední je kontrolní (váhy 8..2, modulo 11).
export function isValidIco(input: string): boolean {
  const ico = input.trim().padStart(8, "0");
  if (!/^\d{8}$/.test(ico)) return false;
  const digits = [...ico].map(Number);
  const sum = digits.slice(0, 7).reduce((acc, d, i) => acc + d * (8 - i), 0);
  const check = (11 - (sum % 11)) % 10;
  return check === digits[7];
}
