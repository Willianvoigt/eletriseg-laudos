// Sanitize text for PDF compatibility (WinAnsi encoding)
// Removes or replaces special characters that can't be encoded
export function sanitizeForPDF(text: string): string {
  if (!text) return text

  const replacements: { [key: string]: string } = {
    // Accented vowels
    á: 'a',
    à: 'a',
    ã: 'a',
    â: 'a',
    ä: 'a',
    é: 'e',
    è: 'e',
    ê: 'e',
    ë: 'e',
    í: 'i',
    ì: 'i',
    î: 'i',
    ï: 'i',
    ó: 'o',
    ò: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ú: 'u',
    ù: 'u',
    û: 'u',
    ü: 'u',
    ç: 'c',
    ñ: 'n',
    // Uppercase accented vowels
    Á: 'A',
    À: 'A',
    Ã: 'A',
    Â: 'A',
    Ä: 'A',
    É: 'E',
    È: 'E',
    Ê: 'E',
    Ë: 'E',
    Í: 'I',
    Ì: 'I',
    Î: 'I',
    Ï: 'I',
    Ó: 'O',
    Ò: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ú: 'U',
    Ù: 'U',
    Û: 'U',
    Ü: 'U',
    Ç: 'C',
    Ñ: 'N',
  }

  return text.replace(/./g, (char) => replacements[char] || char)
}
