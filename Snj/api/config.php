<?php
/**
 * config.php — Configuración de la conexión a la base de datos
 * SNJ FC · Fichajes
 *
 * UBICACIÓN EN EL PROYECTO:
 *   snj/
 *   ├── assets/
 *   ├── api/
 *   │   ├── config.php        ← ESTE ARCHIVO
 *   │   └── fichaje.php
 *   ├── index.html
 *   └── contacto.html
 *
 * ⚠️  SEGURIDAD: este archivo NUNCA debe ser accesible desde el navegador.
 *     Muévelo FUERA de la carpeta pública si tu hosting lo permite, o añade
 *     la regla de .htaccess que se incluye al final de este archivo.
 */

// ── Entorno ──────────────────────────────────────────────────────────────────
// Cambia a false cuando subas a producción
define('SNJ_DEV_MODE', true);

// ── Credenciales de Base de Datos ────────────────────────────────────────────
// Cámbialo por los valores reales de tu servidor.
// En XAMPP local: host=127.0.0.1, user=snj_app, pass=la que pusiste en el SQL
define('DB_HOST',    '127.0.0.1');
define('DB_PORT',    '3306');
define('DB_NAME',    'snj_fc');
define('DB_USER',    'snj_app');
define('DB_PASS',    'Snj2026');   // ← Cambia esto
define('DB_CHARSET', 'utf8mb4');

// ── Cabeceras de errores según entorno ───────────────────────────────────────
if (SNJ_DEV_MODE) {
    // En desarrollo: muestra errores PHP en pantalla
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
} else {
    // En producción: oculta errores (no revelar información al atacante)
    ini_set('display_errors', 0);
    error_reporting(0);
}

/**
 * Crea y devuelve una conexión PDO a MySQL.
 * PDO (PHP Data Objects) es la forma más segura de conectarse
 * porque usa Prepared Statements que previenen SQL Injection.
 *
 * @return PDO
 * @throws PDOException si la conexión falla
 */
function getDB(): PDO
{
    // DSN = Data Source Name, le dice a PDO cómo conectarse
    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_CHARSET
    );

    $options = [
        // Lanza excepciones en lugar de errores silenciosos
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,

        // Devuelve filas como arrays asociativos por defecto
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

        // Desactiva la emulación de prepared statements:
        // MySQL ejecuta la consulta parametrizada de verdad → más seguro
        PDO::ATTR_EMULATE_PREPARES   => false,

        // Conexión persistente: reutiliza la conexión si ya existe (rendimiento)
        PDO::ATTR_PERSISTENT         => false,
    ];

    return new PDO($dsn, DB_USER, DB_PASS, $options);
}
