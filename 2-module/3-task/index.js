let calculator = {};
calculator.read = function (a, b) {
  calculator.x = a;
  calculator.y = b;
};
calculator.sum = function () {
  return calculator.x + calculator.y
};
calculator.mul = function () {
  return calculator.x * calculator.y
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
