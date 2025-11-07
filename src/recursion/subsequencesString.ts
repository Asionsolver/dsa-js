const strings = "abs";
const outputString = "";
const indexing = 0;
const subsequenceString = function (
  str: string,
  output: string,
  index: number
) {
  if (index > str.length) {
    console.log(output);
    return;
  }

  //exclude
  subsequenceString(strings, output, index + 1);

  output = output + str[index];

  // include
  subsequenceString(strings, output, index + 1);
};

subsequenceString(strings, outputString, indexing);
