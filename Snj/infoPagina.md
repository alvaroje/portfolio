Quiero crear un pagina web para mi equipo de futbol con este color de ambientación: #68d791 y que tenga un menú arriba con los siguientes enlaces (cada enlace es un html diferente): jugadores, partidos, camisetas, contacto. 

La pagina inicial va ha ser a modo de introductora sobre información del equipo y un poco resumen de lo que te vas a encontrar a lo largo de la pagina, en la parte de jugadores quiero un sistema de cartas con displey grid, en el que cada carta va a ser un jugador con sus características a modo de puntuación sobre 100, en total 12 cartas. 

En partidos se mostrara una etiqueta con la información de ese partido y una sección de partidos ya jugados en la que aparecerá el resultado, el rival, los goles y datos del partido. 

En camisetas se mostrara el mismo sistema de tarjetas, solo que en ved de las características del jugador solo se vera la camiseta con el dorsal, el nombre y el precio. 
Finalmente en contacto un breve formulario con los mínimos datos necesarios para contactarnos por correo. 

La pagina tiene que tener una estética con el color verde: #68d791 jugando con sus degradados y colores como el negro y mucho blanco.

// Diseños de cartas fifa:

-Evolutions I
-Evolutions II
-Evolutions III

-Mode Mastery

-Winter Wildcards Hero
-Winter Wildcards Icon
-Winter Wildcards Evolution
-Winter Wildcards

-UECL Dreamchasers

// Promts

Estoy haciendo la página web de mi equipo de futbol y tengo una sección de jugadores donde saldremos cada uno con una carta en formato fifa, te voy a pasar dos imágenes (una es de la carta con una cara estándar y otra imagen que es la cara que quiero que aparezca en la carta) asique la imagen final será la carta con la cara de la otra imagen.

// Implementación IA:

Adaptar el formulario a unas pruebas para personas interesadas en acceder al equipo. Mediante los datos del formulario, pasarlos a la IA
para que decida si es apto para entrar en el equipo y le de una nota de 0-10 (Suspenso o Aprobado). Aparte redactarle un correo con
felicitaciones si ha pasado las pruebas teoricas y agendarle una pruba práctica para meterse en el equipo.

// Concepto página: 

Desarrollo web de mi página de futbol incluyendo sus 5 secciones: Inicio(información base de la página con tabla de resultados de la termporada), Jugadores(sección con cartas de cada jugador modo FIFA y estadisticas de cada uno en una tabla), Partidos(lista de todos los partidos jugados), Camisetas(IMPORTANTE sección por que es sobre la que trabajaremos ya que junto con la siguiente sección es de las únicas que faltan por desarrollar. Incluye un vestuario con la mayoría de las camisetas de nuestros jugadores expuestas en un vestuario bonito e interactivo) y Contacto(sección con formulario que me ayudaras a  implementar una base de datos y su conexión con el HTML para recoger los datos). Este proyecto forma parte de mi TFG del grado superior de DAW para luego generar el PDF del proyecto que hay que entregar.

// IMAGEN VESTUARIO:

Te adjunto  la imagen vestuario modelo. Edítala para cambiar las camisetas de la imagen modelo por las de mi equipo de futbol, te adjunto el modelo de nuestras camisetas para que las repliques con sus distintos nombres y números cada una. Te adjunto también el logo del equipo para que lo reemplaces por el logo/escudo del CITY de la imagen modelo del vestuario, el logo debe mantener el color negro de la imagen modelo pero cambiando la forma para que se adapte a la imagen. Edita el texto que aparece encima de las camisetas por: SNJ HALL OF FAME, y cambia el color de fondo azul del texto por el verde de las camisetas. Destaca un poco más las camisetas que la imagen modelo ya que es lo importante pero sin estropear la estructura del vestuario. Te paso los datos de cada camiseta para que las agregues en la imagen final: camiseta1: nombre jugador(ALVAROJE) numero(18), camiseta2: nombre(BARGUEÑO) numero(13). camiseta3: nombre(GONZALEZ) numero(3), camiseta4: nombre(NEIPAR) numero(5), camiseta5: nombre(DOSO) numero(7), camiseta6: nombre(Guille) numero(8), camiseta7: nombre(CHAU) numero(9), camiseta8: nombre(FERRER) numero(10), camiseta9: nombre(DEL CASTILLO) numero(14), camiseta10: nombre(PELUCAS) numero(30), camiseta11: nombre(PRADA) numero(24), camiseta12: nombre(CARRILLO) numero(20), camiseta 13: nombre(Luqui Jr) numero(33). Incluye todas las camisetas en la imagen vestuario final.


Muy bien, te paso el modelo de camiseta para que reajustes el tamaño de cada camiseta. Elimina los asientos azules debajo de las camisetas para aumentar el tamaño de estas. Las camisetas tienen que ser más grandes y ocupar más espacio. Mantén los nombres y números de cada una, eso no cambia.

// Prompt Profesional para Claude

Aquí tienes un prompt estructurado como un desarrollador Senior para guiar a Claude. Cópialo y pégalo tal cual; está diseñado para que te devuelva código limpio, modular y perfectamente explicable ante un tribunal.

Rol: Eres un Desarrollador Frontend Senior experto en UI/UX, HTML5, CSS3 avanzado y Vanilla JavaScript.

Contexto: Estoy desarrollando la página web de mi equipo de fútbol usando tecnologías web estándar. Para la sección "Camisetas", quiero crear un "Vestuario Interactivo". Es un proyecto académico (grado superior DAW), por lo que el código debe ser semántico, limpio, moderno y estar bien comentado.

Objetivo: Desarrollar el código HTML, CSS y JS para una sección de vestuario interactivo utilizando la técnica de capas superpuestas (Absolute Positioning sobre un contenedor relativo).

Requisitos Técnicos:

Estructura HTML: Un contenedor principal (<section>) con una imagen de fondo (el vestuario vacío). Dentro, 5 elementos cliqueables (las camisetas), cada uno con su imagen PNG transparente superpuesta en el lugar correcto.

CSS (Diseño y Animación): >    - El contenedor debe ser responsive y mantener su relación de aspecto.

Las camisetas deben posicionarse de forma fluida (usando %, no px fijos) para que no se descoloquen en pantallas móviles.

Efecto Hover: Al pasar el cursor sobre una camiseta, esta debe escalar suavemente (ej. scale(1.1)) y emitir un resplandor (drop-shadow) en color verde deportivo (#2ed573). Las camisetas no seleccionadas deben bajar ligeramente su opacidad.

JavaScript (Interactividad):

Añade un script en Vanilla JS (ES6+) que escuche el clic en cada camiseta.

Al hacer clic, debe capturar un atributo de datos (ej. data-jugador="Haaland") y mostrar un console.log o un simple alert() con el nombre del jugador (yo me encargaré de conectarlo a mi ventana modal después).

Formato de Salida:
Divide tu respuesta entregando primero el HTML, luego el CSS y finalmente el JS. Explica brevemente por qué has elegido esa estrategia de posicionamiento para garantizar el responsive.

// Camiseta modelo: 

Te paso el modelo de camiseta para poder generar las 12 camisetas del hall de la fama de mi sección vestuario. TAREA GENERAL: Cambiar el nombre y numero de la imagen modelo que te adjunte manteniendo la tipografía de la imagen modelo. Vamos a generar 12 camisetas iguales, pero con distintos nombre y números para cada jugador. TAREA DE ESTE PROMT: Antes de ponernos a cambiar nombres y numeros hay que tener una camiseta modelo con buena apariencia, realista y sin arrugas. Asique tu tarea de este promt es mejorar la imagen modelo con una mejor apariencia(bien presentada), muy realista, cuyo nombre y numero sean perfectamente visibles y sin arrugas. Debuelve la imagen camiseta modelo con estas características.