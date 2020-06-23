/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result = n;
  let x = n;
  if (n == 0) {
    return 1
  }
  for (let i = 1; i < n; i++) {
    x -= 1
    result *= x;
  }


  return result;
}