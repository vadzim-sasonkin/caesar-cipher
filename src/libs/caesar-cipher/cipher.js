function isUpperCase(str) {
  return str === str.toUpperCase();
}

const UPPERCASE_DELTA = 65;
const LOWERCASE_DELTA = 97;

const parseRemainder = remainder =>
  remainder >= 0 ? remainder : 26 + remainder;

const caesarCipher = (str, key, reverse = false) => {
  let decipher = '';
  const multiplier = reverse ? -1 : 1;

  for (let i = 0; i < str.length; i++) {
    if (isUpperCase(str[i])) {
      const remainder =
        (str.charCodeAt(i) - UPPERCASE_DELTA + key * multiplier) % 26;
      decipher += String.fromCharCode(
        parseRemainder(remainder) + UPPERCASE_DELTA
      );
    } else {
      const remainder =
        (str.charCodeAt(i) - LOWERCASE_DELTA + key * multiplier) % 26;
      decipher += String.fromCharCode(
        parseRemainder(remainder) + LOWERCASE_DELTA
      );
    }
  }

  return decipher;
};

module.exports = caesarCipher;
