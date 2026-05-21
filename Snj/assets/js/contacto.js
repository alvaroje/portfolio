/**
 * contacto.js — SNJ FC · Formulario de Fichaje
 * Validación en cliente + envío al backend PHP vía fetch()
 */

'use strict';

/* ── Referencias al DOM ── */
const formulario = document.getElementById('formulario');

/* ── Expresiones regulares de validación ── */
const expresiones = {
    nombre:     /^[a-zA-ZÀ-ÿ\s]{3,50}$/,
    edad:       /^(1[4-9]|[2-5][0-9]|6[0-5])$/,
    correo:     /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    comentario: /^[\s\S]{20,600}$/
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
   VALIDACIÓN GENÉRICA DE INPUTS / TEXTAREA
   ================================================================ */
const validarCampo = (expresion, input, campo) => {
    const grupo = document.getElementById(`grupo__${campo}`);
    const icono = grupo.querySelector('.formulario__validacion-estado');
    const error = grupo.querySelector('.formulario__input-error');

    if (expresion.test(input.value.trim())) {
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        icono.classList.replace('fa-circle-xmark', 'fa-circle-check');
        error.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        icono.classList.replace('fa-circle-check', 'fa-circle-xmark');
        error.classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

/* ================================================================
   VALIDACIÓN DE SELECT (posición)
   ================================================================ */
const validarSelect = (select) => {
    const grupo = document.getElementById('grupo__posicion');
    const icono = grupo.querySelector('.formulario__validacion-estado');
    const error = grupo.querySelector('.formulario__input-error');

    if (select.value !== '') {
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        icono.classList.replace('fa-circle-xmark', 'fa-circle-check');
        error.classList.remove('formulario__input-error-activo');
        campos.posicion = true;
    } else {
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        icono.classList.replace('fa-circle-check', 'fa-circle-xmark');
        error.classList.add('formulario__input-error-activo');
        campos.posicion = false;
    }
};

/* ================================================================
   SLIDER DE NIVEL
   ================================================================ */
const nivelSlider     = document.getElementById('nivel');
const nivelValorBadge = document.getElementById('nivelValor');
const nivelEtiqueta   = document.getElementById('nivelEtiqueta');
const nivelHidden     = document.getElementById('nivel_value');

const etiquetasNivel = {
    1: 'Principiante', 2: 'Iniciado',   3: 'Básico',
    4: 'Amateur',      5: 'Intermedio', 6: 'Avanzado',
    7: 'Competitivo',  8: 'Semi-pro',   9: 'Profesional',
    10: 'Élite 🏆'
};

const actualizarSlider = (valor) => {
    nivelValorBadge.textContent = valor;
    nivelEtiqueta.textContent   = etiquetasNivel[valor] || '';
    nivelHidden.value           = valor;

    const pct = ((valor - 1) / 9) * 100;
    nivelSlider.style.setProperty('--slider-pct', `${pct}%`);

    campos.nivel = true;
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
    charCount.textContent  = len;
    charCount.style.color  = len > 540 ? '#c0392b' : '';
    validarCampo(expresiones.comentario, textarea, 'comentario');
});

textarea.addEventListener('blur', () => {
    validarCampo(expresiones.comentario, textarea, 'comentario');
});

/* ================================================================
   LISTENERS DE INPUTS DE TEXTO / EMAIL / NUMBER
   ================================================================ */
const validarInput = (e) => {
    switch (e.target.name) {
        case 'nombre':   validarCampo(expresiones.nombre,   e.target, 'nombre');   break;
        case 'edad':     validarCampo(expresiones.edad,     e.target, 'edad');     break;
        case 'correo':   validarCampo(expresiones.correo,   e.target, 'correo');   break;
    }
};

formulario
    .querySelectorAll('input[type="text"], input[type="email"], input[type="number"]')
    .forEach((input) => {
        input.addEventListener('keyup', validarInput);
        input.addEventListener('blur',  validarInput);
    });

const selectPosicion = document.getElementById('posicion');
selectPosicion.addEventListener('change', () => validarSelect(selectPosicion));
selectPosicion.addEventListener('blur',   () => validarSelect(selectPosicion));

/* ================================================================
   HELPERS UI
   ================================================================ */
const btnEnviar   = formulario.querySelector('.formulario__btn');
const msgError    = document.getElementById('formulario__mensaje');
const msgExito    = document.getElementById('formulario__mensaje-exito');

/** Muestra un mensaje de error global durante ms milisegundos */
const mostrarError = (texto, ms = 6000) => {
    msgError.querySelector('p').innerHTML =
        `<i class="fa-solid fa-triangle-exclamation"></i> <b>Error:</b> ${texto}`;
    msgError.classList.add('formulario__mensaje-activo');
    setTimeout(() => msgError.classList.remove('formulario__mensaje-activo'), ms);
};

/** Resetea el formulario visualmente tras un envío exitoso */
const resetFormulario = () => {
    formulario.reset();

    nivelValorBadge.textContent = '—';
    nivelEtiqueta.textContent   = '';
    nivelHidden.value           = '';
    nivelSlider.value           = 5;
    nivelSlider.style.setProperty('--slider-pct', '44%');
    charCount.textContent       = '0';

    Object.keys(campos).forEach(k => { campos[k] = false; });
    formulario.querySelectorAll('.formulario__grupo-correcto')
              .forEach(g => g.classList.remove('formulario__grupo-correcto'));
};

/** Cambia el botón a estado de carga mientras espera la respuesta del servidor */
const setBtnLoading = (loading) => {
    btnEnviar.disabled = loading;
    btnEnviar.innerHTML = loading
        ? '<i class="fa-solid fa-spinner fa-spin"></i> Enviando…'
        : '<i class="fa-solid fa-paper-plane"></i> Enviar solicitud';
};

/* ================================================================
   ENVÍO DEL FORMULARIO
   ================================================================ */
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Forzar validación de todos los campos (por si el usuario no los tocó)
    validarCampo(expresiones.nombre,   document.getElementById('nombre'),   'nombre');
    validarCampo(expresiones.edad,     document.getElementById('edad'),     'edad');
    validarCampo(expresiones.correo,   document.getElementById('correo'),   'correo');
    validarSelect(selectPosicion);
    validarCampo(expresiones.comentario, textarea, 'comentario');

    if (!campos.nivel) {
        const grupoNivel = document.getElementById('grupo__nivel');
        grupoNivel.classList.add('formulario__grupo-incorrecto');
        grupoNivel.querySelector('.formulario__input-error')
                  .classList.add('formulario__input-error-activo');
    }

    // 2. Si algún campo es inválido, no enviamos
    if (!Object.values(campos).every(Boolean)) {
        mostrarError('Por favor completa todos los campos correctamente.');
        return;
    }

    // 3. Preparar el payload JSON que recibirá PHP
    const payload = {
        nombre:     document.getElementById('nombre').value.trim(),
        edad:       parseInt(document.getElementById('edad').value, 10),
        correo:     document.getElementById('correo').value.trim(),
        posicion:   selectPosicion.value,
        nivel:      parseInt(nivelHidden.value, 10),
        comentario: textarea.value.trim()
    };

    // 4. Enviar al backend PHP con fetch()
    setBtnLoading(true);

    try {
        const respuesta = await fetch('api/fichaje.php', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload)
        });

        const datos = await respuesta.json();

        if (respuesta.ok && datos.ok) {
            // ── ÉXITO ──
            resetFormulario();
            msgExito.classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                msgExito.classList.remove('formulario__mensaje-exito-activo');
            }, 7000);

        } else {
            // ── Error controlado devuelto por PHP ──
            let textoError = datos.mensaje || 'Error al enviar la solicitud.';

            // Si el servidor devolvió errores de validación detallados, los listamos
            if (datos.errores && datos.errores.length) {
                textoError += '<br>' + datos.errores.join('<br>');
            }
            mostrarError(textoError);
        }

    } catch (errorRed) {
        // Error de red (sin conexión, servidor caído…)
        console.error('[SNJ FC] Error de red:', errorRed);
        mostrarError('No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.');

    } finally {
        setBtnLoading(false);
    }
});