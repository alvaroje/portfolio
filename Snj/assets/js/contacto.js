/**
 * contacto.js — SNJ FC · Formulario de Fichaje
 * Campos: nombre, edad, correo, posicion, nivel, comentario
 */

'use strict';

/* ── Referencias al DOM ── */
const formulario = document.getElementById('formulario');

/* ── Expresiones regulares de validación ── */
const expresiones = {
    nombre:     /^[a-zA-ZÀ-ÿ\s]{3,50}$/,              // Letras y espacios, mín. 3 caracteres
    edad:       /^(1[4-9]|[2-5][0-9]|6[0-5])$/,       // Entero entre 14 y 65
    correo:     /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    comentario: /^[\s\S]{20,600}$/                      // Mínimo 20 caracteres
};

/* ── Estado de validez de cada campo ── */
const campos = {
    nombre:     false,
    edad:       false,
    correo:     false,
    posicion:   false,
    nivel:      false,
    comentario: false
};

/* ================================================================
   FUNCIÓN PRINCIPAL DE VALIDACIÓN DE CAMPOS CON INPUT/TEXTAREA
   ================================================================ */
const validarCampo = (expresion, input, campo) => {
    const grupo = document.getElementById(`grupo__${campo}`);
    const icono = grupo.querySelector('.formulario__validacion-estado');
    const error = grupo.querySelector('.formulario__input-error');

    if (expresion.test(input.value.trim())) {
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        icono.classList.add('fa-circle-check');
        icono.classList.remove('fa-circle-xmark');
        error.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        icono.classList.add('fa-circle-xmark');
        icono.classList.remove('fa-circle-check');
        error.classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

/* ================================================================
   FUNCIÓN DE VALIDACIÓN DE SELECT (posición)
   ================================================================ */
const validarSelect = (select) => {
    const grupo = document.getElementById('grupo__posicion');
    const icono = grupo.querySelector('.formulario__validacion-estado');
    const error = grupo.querySelector('.formulario__input-error');

    if (select.value !== '') {
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        icono.classList.add('fa-circle-check');
        icono.classList.remove('fa-circle-xmark');
        error.classList.remove('formulario__input-error-activo');
        campos.posicion = true;
    } else {
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        icono.classList.add('fa-circle-xmark');
        icono.classList.remove('fa-circle-check');
        error.classList.add('formulario__input-error-activo');
        campos.posicion = false;
    }
};

/* ================================================================
   SLIDER DE NIVEL
   Actualiza el badge visual, el campo oculto y el estado de validez
   ================================================================ */
const nivelSlider      = document.getElementById('nivel');
const nivelValorBadge  = document.getElementById('nivelValor');
const nivelEtiqueta    = document.getElementById('nivelEtiqueta');
const nivelHidden      = document.getElementById('nivel_value');

const etiquetasNivel = {
    1:  'Principiante',
    2:  'Iniciado',
    3:  'Básico',
    4:  'Amateur',
    5:  'Intermedio',
    6:  'Avanzado',
    7:  'Competitivo',
    8:  'Semi-pro',
    9:  'Profesional',
    10: 'Élite 🏆'
};

const actualizarSlider = (valor) => {
    nivelValorBadge.textContent  = valor;
    nivelEtiqueta.textContent    = etiquetasNivel[valor] || '';
    nivelHidden.value            = valor;

    /* Relleno de color proporcional */
    const pct = ((valor - 1) / 9) * 100;
    nivelSlider.style.setProperty('--slider-pct', `${pct}%`);

    /* El nivel se considera válido en cuanto el usuario interactúa */
    campos.nivel = true;

    /* Quita estado incorrecto si lo había */
    const grupo = document.getElementById('grupo__nivel');
    grupo.classList.remove('formulario__grupo-incorrecto');
    grupo.classList.add('formulario__grupo-correcto');
    grupo.querySelector('.formulario__input-error')
         .classList.remove('formulario__input-error-activo');
};

nivelSlider.addEventListener('input', () => {
    actualizarSlider(parseInt(nivelSlider.value, 10));
});

/* ================================================================
   CONTADOR DE CARACTERES DEL TEXTAREA
   ================================================================ */
const textarea  = document.getElementById('comentario');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = len;

    /* Cambia color cuando se acerca al límite */
    charCount.style.color = len > 540 ? '#c0392b' : '';

    validarCampo(expresiones.comentario, textarea, 'comentario');
});

textarea.addEventListener('blur', () => {
    validarCampo(expresiones.comentario, textarea, 'comentario');
});

/* ================================================================
   LISTENERS DE INPUTS DE TEXTO / EMAIL / NUMBER
   ================================================================ */
const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case 'edad':
            validarCampo(expresiones.edad, e.target, 'edad');
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
    }
};

/* Recogemos solo los inputs de texto/email/number (no range, no hidden) */
const inputsTexto = formulario.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="number"]'
);

inputsTexto.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur',  validarFormulario);
});

/* Select de posición */
const selectPosicion = document.getElementById('posicion');
selectPosicion.addEventListener('change', () => validarSelect(selectPosicion));
selectPosicion.addEventListener('blur',   () => validarSelect(selectPosicion));

/* ================================================================
   ENVÍO DEL FORMULARIO
   Comprueba que todos los campos son válidos antes de proceder
   ================================================================ */
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Forzamos validación de campos que el usuario no haya tocado */
    validarCampo(expresiones.nombre,     document.getElementById('nombre'),      'nombre');
    validarCampo(expresiones.edad,       document.getElementById('edad'),        'edad');
    validarCampo(expresiones.correo,     document.getElementById('correo'),      'correo');
    validarSelect(selectPosicion);
    validarCampo(expresiones.comentario, textarea,                               'comentario');

    /* El nivel requiere interacción; si no se tocó, lo marcamos inválido */
    if (!campos.nivel) {
        const grupo = document.getElementById('grupo__nivel');
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.querySelector('.formulario__input-error')
             .classList.add('formulario__input-error-activo');
    }

    const todoValido = Object.values(campos).every(Boolean);

    if (todoValido) {
        /* ── ÉXITO ── */
        formulario.reset();

        /* Resetea el slider visualmente */
        nivelValorBadge.textContent = '—';
        nivelEtiqueta.textContent   = '';
        nivelHidden.value           = '';
        nivelSlider.value           = 5;
        nivelSlider.style.setProperty('--slider-pct', '44%');
        charCount.textContent       = '0';

        /* Restablece estado de campos */
        Object.keys(campos).forEach(k => { campos[k] = false; });

        /* Quita clases de correcto */
        formulario.querySelectorAll('.formulario__grupo-correcto')
                  .forEach(g => g.classList.remove('formulario__grupo-correcto'));

        /* Muestra mensaje de éxito */
        const msgExito = document.getElementById('formulario__mensaje-exito');
        msgExito.classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            msgExito.classList.remove('formulario__mensaje-exito-activo');
        }, 6000);

        /* TODO: aquí se conectará con la base de datos / backend */

    } else {
        /* ── ERROR ── */
        const msgError = document.getElementById('formulario__mensaje');
        msgError.classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            msgError.classList.remove('formulario__mensaje-activo');
        }, 5000);
    }
});