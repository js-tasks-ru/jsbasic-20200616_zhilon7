/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(arr) {
  let result = document.createElement('ul');
  for (let i = 0; i < arr.length; i++) {
    let temp = document.createElement('li');
    temp.append(`${arr[i].fname} ${arr[i].lname}`);
    result.append(temp)
  }
  return result;

}



