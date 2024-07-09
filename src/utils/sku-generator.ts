const ALPHANUMERIC_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomSKU(length: number = 8): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHANUMERIC_CHARACTERS.charAt(Math.floor(Math.random() * ALPHANUMERIC_CHARACTERS.length));
  }
  return result;
}

export { generateRandomSKU };