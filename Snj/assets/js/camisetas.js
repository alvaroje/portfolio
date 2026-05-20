/**
 * vestuario.js — SNJ FC Vestuario Interactivo
 * Gestiona: spotlight de cursor, dim de camisetas no activas,
 * soporte táctil y cursor personalizado.
 */

(function () {
  'use strict';

  const stage      = document.getElementById('vestuarioStage');
  const spotlight  = document.getElementById('spotlight');
  const slots      = stage ? stage.querySelectorAll('.shirt-slot') : [];

  if (!stage) return; // Salida segura si la sección no está en el DOM

  /* ──────────────────────────────────────────
     1. SPOTLIGHT QUE SIGUE AL CURSOR
     Mueve el div radial siguiendo el ratón
     dentro del stage con transformX/Y.
  ────────────────────────────────────────── */
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotlight.style.left = `${x}px`;
    spotlight.style.top  = `${y}px`;
  });

  /* ──────────────────────────────────────────
     2. DIM GLOBAL: clase .has-hover en el stage
     Al entrar en un slot → todos los demás
     se atenúan (ver CSS .vestuario-stage.has-hover)
  ────────────────────────────────────────── */
  slots.forEach((slot) => {
    slot.addEventListener('mouseenter', () => {
      stage.classList.add('has-hover');
    });

    slot.addEventListener('mouseleave', () => {
      stage.classList.remove('has-hover');
    });
  });

  /* ──────────────────────────────────────────
     3. SOPORTE TÁCTIL (móvil/tablet)
     Un toque muestra el tooltip del slot tocado
     y dimea los demás. Segundo toque lo cierra.
  ────────────────────────────────────────── */
  let activeTouchSlot = null;

  slots.forEach((slot) => {
    slot.addEventListener('touchstart', (e) => {
      e.preventDefault(); // evita doble-tap zoom

      if (activeTouchSlot && activeTouchSlot !== slot) {
        // Cierra el anterior
        activeTouchSlot.classList.remove('is-touched');
        stage.classList.remove('has-hover');
      }

      if (activeTouchSlot === slot) {
        // Segundo toque: cierra
        slot.classList.remove('is-touched');
        stage.classList.remove('has-hover');
        activeTouchSlot = null;
      } else {
        // Primer toque: abre
        slot.classList.add('is-touched');
        stage.classList.add('has-hover');
        activeTouchSlot = slot;
      }
    }, { passive: false });
  });

  // Toque fuera del stage cierra todo
  document.addEventListener('touchstart', (e) => {
    if (!stage.contains(e.target) && activeTouchSlot) {
      activeTouchSlot.classList.remove('is-touched');
      stage.classList.remove('has-hover');
      activeTouchSlot = null;
    }
  });

  /* ──────────────────────────────────────────
     4. CURSOR PERSONALIZADO (solo escritorio)
     Reemplaza el cursor nativo dentro del stage
     por un pequeño círculo verde animado.
  ────────────────────────────────────────── */
  if (!('ontouchstart' in window)) {
    // Creamos el cursor custom
    const cursor = document.createElement('div');
    cursor.id = 'vestuario-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(104, 215, 145, 0.85);
      box-shadow: 0 0 10px rgba(104, 215, 145, 0.7);
      pointer-events: none;
      transform: translate(-50%, -50%) scale(1);
      transition: transform 0.15s ease, background 0.15s ease;
      z-index: 9999;
      display: none;
    `;
    document.body.appendChild(cursor);

    stage.addEventListener('mouseenter', () => { cursor.style.display = 'block'; });
    stage.addEventListener('mouseleave', () => { cursor.style.display = 'none'; });

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    });

    // Al entrar en un slot, el cursor crece y cambia color (feedback)
    slots.forEach((slot) => {
      slot.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursor.style.background = 'rgba(255, 215, 0, 0.85)';
        cursor.style.boxShadow = '0 0 16px rgba(255,215,0,0.8)';
      });
      slot.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'rgba(104, 215, 145, 0.85)';
        cursor.style.boxShadow = '0 0 10px rgba(104,215,145,0.7)';
      });
    });
  }

  /* ──────────────────────────────────────────
     5. INTERSECTION OBSERVER
     Re-dispara las animaciones de entrada
     (shirtDrop) cada vez que la sección
     vuelve a ser visible (scroll back up).
  ────────────────────────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          slots.forEach((slot, i) => {
            // Resetea la animación clonando el nodo
            slot.style.animation = 'none';
            // Fuerza reflow
            void slot.offsetWidth;
            slot.style.animation = '';
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(stage);

})();