export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  const numbersArray = [];

  if (start > end) {
    [start, end] = [end, start];
  }

  for (let i = start; i <= end; i++) {
    numbersArray.push(i);
  }

  return numbersArray;
}
