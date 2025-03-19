window.addEventListener("load", function() {
  cargarPeliculas();
  inicioJuego();
});

let peliculas = [];
let indice,elemento,pelicula_aleatoria,pista,pelicula_adivinar;

const intentos = 6;
let errores = 0;

function inicioJuego(){
  document.getElementById("sonido").src = "./assets/mp3/The Omen Main Theme-Ave Satani.mp3";
  document.getElementById("inputLetra").disabled = false;
  indice = Math.floor(Math.random() * peliculas.length);
  elemento = peliculas[indice];
  pelicula_aleatoria = elemento[0].toUpperCase();
  pista = elemento[1];  
  document.getElementById("pelicula_aleatoria").innerText = "Pista: "+pista;
  pelicula_adivinar = pelicula_aleatoria.split("");
  for(let x=0;x<pelicula_aleatoria.length;x++){
    if(pelicula_aleatoria[x]!=" "){
      pelicula_adivinar[x] = "*";
    }
    else{
      pelicula_adivinar[x] = " ";
    }
  }
  document.getElementById("pelicula_adivinar").innerText =
  pelicula_adivinar.join('');
}

let btnReinicio =  document.getElementById("btnReinicio");

btnReinicio.addEventListener("click",function(){
  errores = 0;
  document.getElementById("intentos").innerHTML = 0;
  updateImagen(errores);
  inicioJuego();
  document.getElementById("mensaje").innerText = "";
  document.getElementById("inputLetra").value = "";
} )

function updatePelicula() {
  document.getElementById("pelicula_adivinar").innerText =
    pelicula_adivinar.join('');
  document.getElementById("intentos").innerText = errores;
  updateImagen(errores);
  
}

function validarLetra(letra) {
  if (pelicula_aleatoria.includes(letra)) {
    for (let i = 0; i < pelicula_aleatoria.length; i++) {
      if (pelicula_aleatoria[i] == letra) {
        pelicula_adivinar[i] = letra;
      }
    }
  } else {
    errores++;
  }
  updatePelicula();
  
}

function verificarEstado() {
  if (pelicula_adivinar.join("") == pelicula_aleatoria) {
    document.getElementById("mensaje").innerText =
      "¡Felicidades! Has adivinado la pelicula";
    document.getElementById("inputLetra").disabled = true;
    document.getElementById("imagen").src = "./assets/img/ganaste_halloween.png";
    document.getElementById("sonido").src = "./assets/mp3/street-fighter you win.mp3";
    return true;
  } else if (errores >= intentos) {
    document.getElementById("mensaje").innerText =
      "Has perdido la pelicula era :" + pelicula_aleatoria;
      document.getElementById("inputLetra").disabled = true;
      document.getElementById("imagen").src = "./assets/img/ahorcado.png";
      document.getElementById("sonido").src = "./assets/mp3/you-lose.mp3";
    return true;  
  }
  return false;
}

let input = document.getElementById("inputLetra");

input.addEventListener("keypress", function(event) {
  console.log("entre")
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("boton").click();
  }
});


const boton = document.getElementById("boton");

boton.addEventListener("click", function(){
 
  let inpLetra = document.getElementById('inputLetra');
  let letra = inpLetra.value.toUpperCase();
  if(letra && letra.length == 1 && /[A-Z]/.test(letra)){
      validarLetra(letra);
      
      verificarEstado();
  }
  else{
      alert("Por favor, ingresa solo una letra valida.")
    
  }
  inpLetra.value = ""; 
  inpLetra.focus();
});

function updateImagen(errores){
  if (errores == 0) {
    document.getElementById("imagen").src = "./assets/img/ahorcado0.png";
  } else if (errores == 1) {
    document.getElementById("imagen").src = "./assets/img/ahorcado1.png";
  } else if (errores == 2) {
    document.getElementById("imagen").src = "./assets/img/ahorcado2.png";
  } else if (errores == 3) {
    document.getElementById("imagen").src = "./assets/img/ahorcado3.png";
  } else if (errores == 4) {
    document.getElementById("imagen").src = "./assets/img/ahorcado4.png";
  } else if (errores == 5) {
    document.getElementById("imagen").src = "./assets/img/ahorcado5.png";
  } else if (errores == 6) {
    document.getElementById("imagen").src = "./assets/img/ahorcado6.png";
  }
}

function cargarPeliculas(){
  peliculas= [
     ["EL RESPLANDOR","La locura se apodera de un hombre en un hotel solitario y aislado"],
     ["HALLOWEEN","Michael Myers vuelve cada año en una noche especial para aterroriza"],
     ["LA COSA","La historia se desarrolla en la Antartida"],
     ["PSICOSIS","La escena mas popular se da en una bañera"],
     ["MASACRE EN TEXAS","Un grupo de amigos enfrenta a un asesino que usa una motosierra como arma"],
     ["EL ARO", "Una misteriosa cinta de video que causa la muerte de quien la ve en siete días"],
     ["ACTIVIDAD PARANORMAL","Cámara casera que capta sucesos extraños y escalofriantes en una casa"],
     ["LA PROFECIA","El numero 666 tiene un papel importante en la pelicula"],
     ["LOS OTROS","Una madre y sus hijos creen vivir en una casa embrujada, pero no están solos"],
     ["LA BRUJA DE BLAIR","Tres jóvenes desaparecen en un bosque mientras graban un documental"],
     ["CEMENTERIO DE ANIMALES","Basada en una novela de Stephen King, un lugar que trae de vuelta a los muertos"],
     ["TIBURON","Un peligro acecha en el agua"],
     ["EL CONJURO","Basada en hechos reales, una familia es atormentada por espiritus"],
     ["INSIDIOUS","Una familia descubre que su hijo está atrapado en otra dimensión."],
     ["LA BRUJA","Una familia del siglo XVII enfrenta fuerzas oscuras en el bosque"],
     ["EL EXORCISTA",'La historia de una posesión demoníaca que aterró al mundo en los años 70.'],
     ["UN LUGAR EN SILENCIO","Una familia debe vivir en silencio para evitar ser cazada por criaturas sensibles al sonido"],
     ["EL BABADOOK","Una madre y su hijo son acosados por una entidad siniestra de un libro infantil"]
   ];
 }
