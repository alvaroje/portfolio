<?php
/**
 * fichaje.php — Endpoint de la API de Fichajes
 * SNJ FC
 *
 * Recibe una petición POST con los datos del formulario (JSON),
 * los valida, los sanitiza y los inserta en la base de datos.
 *
 * URL de uso: POST /api/fichaje.php
 */

// ── 0. Cargar configuración ───────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

// ── 1. Cabeceras de respuesta ─────────────────────────────────────────────────
// Siempre respondemos JSON
header('Content-Type: application/json; charset=utf-8');

// CORS: solo permite peticiones desde tu propio dominio
// Cambia 'http://localhost' por tu dominio real en producción
$allowedOrigins = [
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:80',
    // 'https://tudominio.com',  ← Descomenta y añade tu dominio en producción
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');   // Evita MIME-sniffing
header('X-Frame-Options: DENY');             // Evita clickjacking

// Responder a preflight de CORS (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── 2. Solo aceptamos POST ────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

// ── 3. Leer y decodificar el JSON del body ────────────────────────────────────
$rawBody = file_get_contents('php://input');
$datos   = json_decode($rawBody, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($datos)) {
    http_response_code(400); // Bad Request
    echo json_encode(['ok' => false, 'mensaje' => 'Formato de datos incorrecto.']);
    exit;
}

// ── 4. Sanitización ──────────────────────────────────────────────────────────
// Eliminamos espacios sobrantes y etiquetas HTML de todos los campos de texto.
// Esto es la primera barrera contra XSS.
$nombre     = trim(strip_tags($datos['nombre']     ?? ''));
$edad       = trim(strip_tags((string)($datos['edad'] ?? '')));
$correo     = trim(strip_tags($datos['correo']     ?? ''));
$posicion   = trim(strip_tags($datos['posicion']   ?? ''));
$nivel      = trim(strip_tags((string)($datos['nivel'] ?? '')));
$comentario = trim(strip_tags($datos['comentario'] ?? ''));

// ── 5. Validación del lado servidor ──────────────────────────────────────────
// NUNCA confíes solo en la validación del cliente (JS).
// Un atacante puede mandar peticiones directas a este endpoint.
$errores = [];

// Nombre: 3-100 caracteres, solo letras, espacios y acentos
if (!preg_match('/^[a-zA-ZÀ-ÿ\s]{3,100}$/u', $nombre)) {
    $errores[] = 'Nombre inválido.';
}

// Edad: número entero entre 14 y 65
if (!ctype_digit($edad) || (int)$edad < 14 || (int)$edad > 65) {
    $errores[] = 'Edad inválida (debe estar entre 14 y 65).';
}

// Correo: formato estándar
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errores[] = 'Correo electrónico inválido.';
}

// Correo: longitud máxima según RFC 5321
if (strlen($correo) > 254) {
    $errores[] = 'Correo demasiado largo.';
}

// Posición: solo valores permitidos de la lista del formulario
$posicionesPermitidas = ['POR','LD','LI','DFC','LIB','MCD','MC','MCO','ED','EI','SD','DC'];
if (!in_array($posicion, $posicionesPermitidas, true)) {
    $errores[] = 'Posición no válida.';
}

// Nivel: entero entre 1 y 10
if (!ctype_digit($nivel) || (int)$nivel < 1 || (int)$nivel > 10) {
    $errores[] = 'Nivel de juego inválido (debe estar entre 1 y 10).';
}

// Comentario: entre 20 y 600 caracteres
$longComentario = mb_strlen($comentario, 'UTF-8');
if ($longComentario < 20 || $longComentario > 600) {
    $errores[] = 'El comentario debe tener entre 20 y 600 caracteres.';
}

// Si hay errores de validación → 422 Unprocessable Entity
if (!empty($errores)) {
    http_response_code(422);
    echo json_encode([
        'ok'      => false,
        'mensaje' => 'Datos no válidos.',
        'errores' => $errores
    ]);
    exit;
}

// ── 6. Rate limiting básico: máximo 3 envíos por IP en 10 minutos ────────────
// Esto evita ataques de spam o flooding contra el endpoint.
// En producción más seria usarías Redis o una tabla específica.
$ipOrigen = $_SERVER['HTTP_X_FORWARDED_FOR']
          ?? $_SERVER['REMOTE_ADDR']
          ?? '0.0.0.0';

// Tomamos solo la primera IP del encabezado (puede ser lista separada por comas)
$ipOrigen = trim(explode(',', $ipOrigen)[0]);

// Validamos que sea una IP real
if (!filter_var($ipOrigen, FILTER_VALIDATE_IP)) {
    $ipOrigen = '0.0.0.0';
}

try {
    $db = getDB();

    // Contar envíos de esta IP en los últimos 10 minutos
    $stmtRateLimit = $db->prepare(
        'SELECT COUNT(*) AS total
         FROM fichajes
         WHERE ip_origen = :ip
           AND fecha_envio > DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
    );
    $stmtRateLimit->execute([':ip' => $ipOrigen]);
    $rateLimitRow = $stmtRateLimit->fetch();

    if ((int)$rateLimitRow['total'] >= 3) {
        http_response_code(429); // Too Many Requests
        echo json_encode([
            'ok'      => false,
            'mensaje' => 'Demasiados envíos. Espera unos minutos antes de intentarlo de nuevo.'
        ]);
        exit;
    }

    // ── 7. Inserción con Prepared Statement ──────────────────────────────────
    // Los placeholders (:nombre, :edad…) son la protección definitiva
    // contra SQL Injection: PDO nunca interpreta los valores como código SQL.
    $sql = '
        INSERT INTO fichajes
            (nombre, edad, correo, posicion, nivel, comentario, ip_origen)
        VALUES
            (:nombre, :edad, :correo, :posicion, :nivel, :comentario, :ip)
    ';

    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':nombre'     => $nombre,
        ':edad'       => (int)$edad,
        ':correo'     => $correo,
        ':posicion'   => $posicion,
        ':nivel'      => (int)$nivel,
        ':comentario' => $comentario,
        ':ip'         => $ipOrigen,
    ]);

    // ID del registro recién insertado (útil para futura referencia / email)
    $nuevoId = $db->lastInsertId();

    // ── 8. Respuesta de éxito ─────────────────────────────────────────────────
    http_response_code(201); // Created
    echo json_encode([
        'ok'      => true,
        'mensaje' => '¡Solicitud recibida! Nos pondremos en contacto contigo pronto.',
        'id'      => (int)$nuevoId
        // ↑ El id lo guardarás cuando implementes el envío de email
    ]);

} catch (PDOException $e) {

    // Error de base de datos: lo registramos en el log del servidor
    // pero NUNCA mostramos el mensaje técnico al usuario (revelaría estructura interna)
    error_log('[SNJ FC] Error BD en fichaje.php: ' . $e->getMessage());

    http_response_code(500); // Internal Server Error
    echo json_encode([
        'ok'      => false,
        'mensaje' => 'Error interno del servidor. Inténtalo de nuevo más tarde.'
    ]);
}
