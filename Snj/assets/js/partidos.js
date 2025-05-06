const inputRival = document.getElementById('buscarRival');
const inputJornada = document.getElementById('buscarJornada');

function filtrarPartidos() {
    const rivalTexto = inputRival.value.toLowerCase().trim();
    const jornadaTexto = inputJornada.value.trim();

    document.querySelectorAll('.carta-partido').forEach(carta => {
        const nombreRival = carta.querySelector('.equipo-rival h3').textContent.toLowerCase();
        const textoJornada = carta.querySelector('.jornada h4').textContent.toLowerCase();

        // Verifica si el rival coincide
        const coincideRival = nombreRival.includes(rivalTexto);
        // Verifica si la jornada coincide (si el input está vacío o es 0, se ignora)
        const coincideJornada = textoJornada.includes("jornada " + jornadaTexto.toLowerCase());

        // Mostrar todos si ambos inputs están vacíos o en cero
        const mostrar =
            (rivalTexto === "" && (jornadaTexto === "" || jornadaTexto === "0")) ||
            (!rivalTexto && coincideJornada) ||
            (!jornadaTexto || jornadaTexto === "0") && coincideRival ||
            (coincideRival && coincideJornada);

        carta.style.display = mostrar ? 'flex' : 'none';
    });
}

inputRival.addEventListener('input', filtrarPartidos);
inputJornada.addEventListener('input', filtrarPartidos);