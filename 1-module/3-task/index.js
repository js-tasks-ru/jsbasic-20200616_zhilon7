/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if (!!str) {
    return str[0].toLocaleUpperCase() + str.slice(1)
  }
  return ""

}
