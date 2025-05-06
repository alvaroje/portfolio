const inputRival = document.getElementById('buscarRival');
const inputJornada = document.getElementById('buscarJornada');
    
function filtrarPartidos() {
    const rivalTexto = inputRival.value.toLowerCase();
    const jornadaTexto = inputJornada.value.trim();

    document.querySelectorAll('.carta-partido').forEach(carta => {
        const nombreRival = carta.querySelector('.equipo-rival h3').textContent.toLowerCase();
        const textoJornada = carta.querySelector('.jornada h4').textContent.toLowerCase();

        const coincideRival = nombreRival.includes(rivalTexto);
        const coincideJornada = textoJornada.includes("jornada " + jornadaTexto.toLowerCase());

        const mostrar =
            (!rivalTexto || coincideRival) &&
            (!jornadaTexto || coincideJornada);

        carta.style.display = mostrar ? 'flex' : 'none';
    });
}

inputRival.addEventListener('input', filtrarPartidos);
inputJornada.addEventListener('input', filtrarPartidos);