/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
*/
function checkSpace(name) {
  for (x of name) {
    if (x == " ") {
      return false
    }
  }
  return true
}
function isValid(name) {
  if (name.length >= 4 && checkSpace(name)) {
    return true
  }
  return false
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
