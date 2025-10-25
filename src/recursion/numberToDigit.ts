const number = 55465465;

function convertNumberToDigit(number: number) {
  // handle zero explicitly
  if (number === 0) {
    console.log(0);
    return;
  }

  // ensure positive integer
  number = Math.abs(number);

  const digit = number % 10;
  const newNumber = Math.floor(number / 10);

  if (newNumber > 0) {
    convertNumberToDigit(newNumber);
  }

  console.log(digit);
}

convertNumberToDigit(number);
