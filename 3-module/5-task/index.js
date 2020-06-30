/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let result = []
  str = str.split(',')
    .map(item => item.split(' ')
      .filter(item => isFinite(item) && item != '')
    )
  result = result.concat(...str).sort((a, b) => b - a)
  return {
    min: +result[result.length - 1],
    max: +result[0]
  }
}
