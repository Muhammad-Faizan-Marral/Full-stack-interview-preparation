// Q. Reverse a string without using built-in `.reverse()`.



function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
console.log(reverseString('Coder')); // "redoC"
