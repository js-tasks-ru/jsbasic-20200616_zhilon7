let calculator = {
  read: function (a, b) {
    calculator.x = a;
    calculator.y = b;
  },
  sum: function () {
    return calculator.x + calculator.y
  },
  mul: function () {
    return calculator.x * calculator.y
  }

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
