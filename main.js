let display = document.querySelector(".display");
let buttons = Array.from(document.querySelectorAll(".button"));

// Хранение текущего выражения в виде строки
let currentExpression = "";

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.innerText;

    switch (buttonValue) {
      case "AC":
        // Сброс выражения и дисплея
        currentExpression = "";
        display.innerText = "0";
        break;

      case "=":
        try {
          // Вычисление выражения с использованием функции
          const result = calculateExpression(currentExpression);
          display.innerText = result;
          currentExpression = result.toString(); // Обновляем выражение результатом
        } catch (error) {
          display.innerText = "Error!";
          currentExpression = "";
        }
        break;

      case "+/-":
        // Инвертирование знака текущего числа
        if (currentExpression) {
          if (currentExpression.startsWith("-")) {
            currentExpression = currentExpression.slice(1);
          } else {
            currentExpression = "-" + currentExpression;
          }
          display.innerText = currentExpression;
        }
        break;

      case "%":
        // Деление текущего числа на 100
        if (currentExpression) {
          const result = parseFloat(currentExpression) / 100;
          currentExpression = result.toString();
          display.innerText = currentExpression;
        }
        break;

      default:
        // Добавление символов в выражение
        if (display.innerText === "0" && buttonValue !== ".") {
          currentExpression = buttonValue;
        } else {
          currentExpression += buttonValue;
        }
        display.innerText = currentExpression;
    }
  });
});

// Функция для вычисления выражения
function calculateExpression(expression) {
  const operators = /[\+\-\*\/]/; // Операторы: +, -, *, /
  const tokens = expression.split(operators).map(Number); // Разделяем на числа
  const operator = expression.match(operators); // Ищем оператор

  if (!tokens || !operator || tokens.length !== 2) {
    throw new Error("Invalid expression");
  }

  const [a, b] = tokens;

  switch (operator[0]) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    default:
      throw new Error("Unknown operator");
  }
}
