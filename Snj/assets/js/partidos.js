// Filtrar Partidos
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

// Cargar Partidos con json
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('partidosContainer');

    fetch('assets/json/partidos.json')
        .then(response => response.json())
        .then(partidos => {
            container.innerHTML = '';

            partidos.forEach(partido => {
                const golesHTML = partido.goles.length
                    ? partido.goles.map(gol => `<p>${gol}</p>`).join('')
                    : '<p>Sin goles</p>';

                container.innerHTML += `
                    <div class="carta-partido">
                        <div class="equipo equipo-local">
                            <img src="${partido.localImg}" alt="Logo ${partido.local}">
                            <h3>${partido.local}</h3>
                        </div>
                        <div class="goles">${golesHTML}</div>
                        <div class="resultado">
                            <h2>${partido.resultado}</h2>
                        </div>
                        <div class="jornada">
                            <h4>Jornada ${partido.jornada}</h4>
                            <p><a href="https://maps.app.goo.gl/2jJ4wSoHV1boWvo49">${partido.lugar}</a></p>
                            <p>${partido.fecha}</p>
                            <p>${partido.hora}</p>
                        </div>
                        <div class="equipo equipo-rival">
                            <img src="${partido.rivalImg}" alt="Logo ${partido.rival}">
                            <h3>${partido.rival}</h3>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error al cargar los partidos:', error);
            container.innerHTML = '<p>Error al cargar los partidos.</p>';
        });
});
