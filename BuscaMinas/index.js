let porcentajeBomba = 0.23;

document.addEventListener("DOMContentLoaded", () => {
    const selectDificultad = document.getElementById("difficulty");
    const container = document.querySelector(".container");
    const botones = document.getElementsByTagName("button");

    selectDificultad.addEventListener("change", (event) => {
        const dificultadSeleccionada = event.target.value;
        let size = 3; // Tamaño por defecto (3x3)

        if (dificultadSeleccionada === "2") {
            size = 4; // 4x4 si es "Medio"
        } else if (dificultadSeleccionada === "3") {
            size = 6; // 6x6 si es "Difícil"
        }

        generarTablero(size);
    });

    function generarTablero(size) {
        container.innerHTML = ""; // Limpiar los botones anteriores
        document.getElementById('resultado').classList.remove('resultadoPerdido')
        document.getElementById('resultado').classList.remove('resultadoGanado')
        document.getElementById('resultado').innerHTML = ''
        container.style.gridTemplateColumns = `repeat(${size}, 60px)`; // Ajustar columnas

        const totalBotones = size * size;
        for (let i = 0; i < totalBotones; i++) {
            const button = document.createElement("button");
            button.textContent = "?";
            button.value = Math.random()
            container.appendChild(button);
        }

        for (let boton of botones) {
            let totalBombas = 0
            if (boton.value<porcentajeBomba) {
                totalBombas++
            }
            boton.addEventListener("click", function () {
                jugar(boton, totalBombas, size);
                boton.disabled = true
            });
        }
    }

    // Generar el tablero inicial (3x3)
    generarTablero(3);
});

let result = 0;

function jugar(boton, totalBombas, size) {
    
    if (boton.value<porcentajeBomba) {
        boton.classList.add('botonBomba')
        boton.textContent = "";
        document.getElementById('resultado').innerHTML = '<h3>Perdiste</h3>'
        document.getElementById('resultado').classList.add('resultadoPerdido')

        setTimeout(() => {
            location.reload();
        }, 2000);

    } else {
        boton.classList.add('botonLibre')
        boton.textContent = "1";
        result ++
    }
    if (result == (size * size) - totalBombas) {
        document.getElementById('resultado').innerHTML = '<h3>Has Ganado</h3>'
        document.getElementById('resultado').classList.add('resultadoGanado')

        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}
