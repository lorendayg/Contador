// Función para definir la prioridad de operadores
const prioridad = (op) => {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
};

// Convertir infijo a postfijo
const infijoAPostfijo = (expresion) => {
  let salida = [];
  let pila = [];
  let tokens = expresion.match(/\d+|[+\-*/()]/g);

  for (let token of tokens) {
    if (!isNaN(token)) {
      salida.push(token);
    } else if (token === '(') {
      pila.push(token);
    } else if (token === ')') {
      while (pila.length && pila[pila.length - 1] !== '(') {
        salida.push(pila.pop());
      }
      pila.pop();
    } else {
      while (pila.length && prioridad(pila[pila.length - 1]) >= prioridad(token)) {
        salida.push(pila.pop());
      }
      pila.push(token);
    }
  }
  while (pila.length) salida.push(pila.pop());
  return salida.join(" ");
};

// Convertir infijo a prefijo
const infijoAPrefijo = (expresion) => {
  let tokens = expresion.match(/\d+|[+\-*/()]/g).reverse();
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '(') tokens[i] = ')';
    else if (tokens[i] === ')') tokens[i] = '(';
  }
  let postfijo = infijoAPostfijo(tokens.join(" "));
  return postfijo.split(" ").reverse().join(" ");
};

// Evaluar la expresión en infijo
const evaluar = (expr) => Function('"use strict";return (' + expr + ')')();

// Función principal
const procesar = () => {
  let expr = document.getElementById("operacion").value;
  if (!expr.trim()) return;

  try {
    // Tiempo y conversión infijo
    let inicioInfijo = performance.now();
    let infijo = expr;
    let finInfijo = performance.now();

    // Tiempo y conversión postfijo
    let inicioPostfijo = performance.now();
    let postfijo = infijoAPostfijo(expr);
    let finPostfijo = performance.now();

    // Tiempo y conversión prefijo
    let inicioPrefijo = performance.now();
    let prefijo = infijoAPrefijo(expr);
    let finPrefijo = performance.now();

    // Tiempo y evaluación
    let inicioEval = performance.now();
    let resultado = evaluar(expr);
    let finEval = performance.now();

    document.getElementById("infijo").innerText = infijo;
    document.getElementById("tiempoInfijo").innerText = (finInfijo - inicioInfijo).toFixed(6) + " ms";

    document.getElementById("postfijo").innerText = postfijo;
    document.getElementById("tiempoPostfijo").innerText = (finPostfijo - inicioPostfijo).toFixed(6) + " ms";

    document.getElementById("prefijo").innerText = prefijo;
    document.getElementById("tiempoPrefijo").innerText = (finPrefijo - inicioPrefijo).toFixed(6) + " ms";

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("tiempoResultado").innerText = (finEval - inicioEval).toFixed(6) + " ms";

  } catch (e) {
    document.getElementById("resultado").innerText = "Error en operación";
    document.getElementById("tiempoInfijo").innerText = "---";
    document.getElementById("tiempoPostfijo").innerText = "---";
    document.getElementById("tiempoPrefijo").innerText = "---";
    document.getElementById("tiempoResultado").innerText = "---";
  }
};
