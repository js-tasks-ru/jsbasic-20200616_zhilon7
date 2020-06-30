/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  str.split(',').map(item => item.split(' ')).filter((item, index) => typeof item[index] == number)
}
