// Q. Find duplicate values in an array.

function findDuplicates(arr) {
  const seen = new Set();
  const duplicate = new Set();
  for (const item of arr) {
    if (seen.has(item)) {
      duplicate.add(item);
    }
    seen.add(item);
  }
  return [...duplicate];
}

console.log(findDuplicates([1, 2, 3, 2, 4, 1])); // [2,1]
