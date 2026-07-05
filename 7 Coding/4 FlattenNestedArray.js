//  Q. Flatten a nested array.
function flattenArray(array) {
  let flattenArr = [];

  for (let i = 0; i < array.length; i++) {

    if (Array.isArray(array[i])) {

      const nestedArray = flattenArray(array[i]);

      flattenArr.push(...nestedArray);

    } else {

      flattenArr.push(array[i]);

    }
  }

  return flattenArr;
}

console.log(flattenArray([1, [2, [3, 4], 5], 6]));