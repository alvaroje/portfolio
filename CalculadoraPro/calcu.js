// Seleccionar todos los botones con la clase 'boton'
const botones = document.querySelectorAll(".btn");
const parrafo = document.getElementById("string");

// Array operaciones
let numeros = [];

// Agregar un event listener a cada botón
botones.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
        // Obtener el valor del botón clicado
        parrafo.textContent +=  evento.target.value;

    });
});

function eliminar() {
    parrafo.textContent = ""
}

function operarInfinito() {
    let simbolos = [];
    let numeros = [];
    let cont = 0;
    for(let i = 0; i<parrafo.textContent.length; i++) {
        if (parrafo.textContent.charAt(i).includes('+') || parrafo.textContent.charAt(i).includes('-') || parrafo.textContent.charAt(i).includes('÷') || parrafo.textContent.charAt(i).includes('*')) {
            simbolos[cont] = parrafo.textContent.charAt(i);
            parrafo.textContent = parrafo.textContent.replace(parrafo.textContent.charAt(i),".");
            cont ++;
        }
    }
    numeros = parrafo.textContent.split(".");
    switch (simbolos[0]) {
        case '+':
        result = parseFloat(numeros[0]) + parseFloat(numeros[1]);
        break;
    case '-':
        result = parseFloat(numeros[0]) - parseFloat(numeros[1]);
        break;
    case '*':
        result = parseFloat(numeros[0]) * parseFloat(numeros[1]);
        break;
    case '÷':
        result = parseFloat(numeros[0]) / parseFloat(numeros[1]);
        break;
    default:
        console.error('Operación no válida');
        break; 
    }
    if (simbolos.length > 1) {
        for(let i = 1; i < cont; i++) {
            switch (simbolos[i]) {
                case '+':
                    result = result + parseFloat(numeros[i + 1]);
                    break;
                case '-':
                    result = result - parseFloat(numeros[i + 1]);
                    break;
                case '*':
                    result = result * parseFloat(numeros[i + 1]);
                    break;
                case '÷':
                    result = result / parseFloat(numeros[i + 1]);
                    break;
                default:
                    console.error('Operación no válida');
                    break;
            }
        }
        parrafo.textContent = result;
    } else if (cont == 1) {
        parrafo.textContent = result;
    } else {
        alert("Introduce una operación");
    }
}

function del() {
    parrafo.textContent = parrafo.textContent.slice(0, -1);
}

