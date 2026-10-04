<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validar reCAPTCHA v2
    $recaptcha_secret = "6LfBqGotAAAAAFX9PBkuq7ktAzmOiYsVwwCxRFj6";
    $recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    if (empty($recaptcha_response)) {
        die("<h3>Error: No completaste la verificación del reCAPTCHA.</h3><p>Por favor vuelve atrás y marca la casilla 'No soy un robot'.</p><p><a href='javascript:history.back()'>Volver atrás</a></p>");
    }

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    );

    $response = false;
    $curl_error_msg = '';
    $fsock_error_msg = '';

    // 1. Intentar usando cURL primero
    if (function_exists('curl_version')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        
        // Desactivamos la verificación estricta de SSL para evitar errores comunes en hostings
        // con certificados CA desactualizados o entornos locales (Error 60 de cURL)
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        if ($response === false) {
            $curl_error_msg = curl_error($ch);
        }
        curl_close($ch);
    } 
    // 2. Fallback a file_get_contents si cURL fallara por alguna razón y allow_url_fopen está activado
    if ($response === false && ini_get('allow_url_fopen')) {
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data),
                'timeout' => 10
            )
        );
        $context = stream_context_create($options);
        $response = @file_get_contents($url, false, $context);
    }
    // 3. Fallback a fsockopen (Sockets directos) si los anteriores fallan
    if ($response === false && function_exists('fsockopen')) {
        $host = 'www.google.com';
        $port = 443;
        $path = '/recaptcha/api/siteverify';
        $post_data = http_build_query($data);
        
        $fp = @fsockopen('ssl://' . $host, $port, $errno, $errstr, 10);
        if ($fp) {
            // Usamos HTTP/1.0 para evitar respuestas con chunked transfer encoding (como Transfer-Encoding: chunked)
            $out = "POST $path HTTP/1.0\r\n";
            $out .= "Host: $host\r\n";
            $out .= "Content-Type: application/x-www-form-urlencoded\r\n";
            $out .= "Content-Length: " . strlen($post_data) . "\r\n\r\n";
            $out .= $post_data;
            
            fwrite($fp, $out);
            $raw_response = '';
            while (!feof($fp)) {
                $raw_response .= fgets($fp, 1024);
            }
            fclose($fp);
            
            // Separar cabeceras HTTP de la respuesta JSON
            $parts = explode("\r\n\r\n", $raw_response, 2);
            $response = isset($parts[1]) ? trim($parts[1]) : false;
        } else {
            $fsock_error_msg = "$errstr ($errno)";
        }
    }

    if ($response === false) {
        // Error de conexión con los servidores de Google o configuración del hosting
        die("<h3>Error de conexión con los servidores de Google reCAPTCHA</h3>" .
            "<p>Tu servidor de hosting tiene deshabilitadas o bloqueadas todas las opciones para realizar peticiones externas desde PHP. Esto impide validar el reCAPTCHA.</p>" .
            "<ul>" .
            "<li><strong>cURL:</strong> " . (function_exists('curl_version') ? 'Habilitado (Error: ' . htmlspecialchars($curl_error_msg) . ')' : 'Deshabilitado / No instalado') . "</li>" .
            "<li><strong>allow_url_fopen:</strong> " . (ini_get('allow_url_fopen') ? 'Habilitado' : 'Deshabilitado') . "</li>" .
            "<li><strong>fsockopen (Sockets):</strong> " . (function_exists('fsockopen') ? 'Habilitado (Error: ' . htmlspecialchars($fsock_error_msg) . ')' : 'Deshabilitado / Bloqueado') . "</li>" .
            "</ul>" .
            "<p><strong>¿Cómo solucionarlo?</strong></p>" .
            "<ol>" .
            "<li>Ingresa al panel de control de tu hosting (por ejemplo, cPanel).</li>" .
            "<li>Busca la sección <strong>Seleccionar versión de PHP</strong> (Select PHP Version) o <strong>Configuración de PHP</strong> (MultiPHP INI Editor).</li>" .
            "<li>Habilita la extensión <strong>curl</strong> y activa la casilla de la directiva <strong>allow_url_fopen</strong>.</li>" .
            "<li>Si no encuentras estas opciones en tu panel, ponte en contacto con el <strong>soporte técnico de tu hosting</strong> y pídeles que te <strong>habiliten la extensión cURL de PHP</strong> (es lo estándar y más seguro).</li>" .
            "</ol>" .
            "<p><a href='javascript:history.back()'>Volver atrás</a></p>");
    }

    // Limpiar cualquier residuo de chunked encoding u otras cabeceras en el cuerpo del mensaje
    if ($response !== false) {
        $start = strpos($response, '{');
        $end = strrpos($response, '}');
        if ($start !== false && $end !== false) {
            $response = substr($response, $start, $end - $start + 1);
        }
    }

    $response_keys = json_decode($response, true);

    if (!$response_keys || !isset($response_keys["success"]) || !$response_keys["success"]) {
        // Guardamos en log si es posible escribir, pero también lo mostramos en pantalla
        @file_put_contents('captcha_error.log', date('Y-m-d H:i:s') . ' - Response: ' . $response . "\n", FILE_APPEND);
        
        die("<h3>Error de validación de reCAPTCHA (Google)</h3>" .
            "<p>Google rechazó la verificación del formulario.</p>" .
            "<p><strong>Respuesta de Google:</strong></p>" .
            "<pre>" . htmlspecialchars($response) . "</pre>" .
            "<p><strong>Códigos de error:</strong> " . (isset($response_keys["error-codes"]) ? htmlspecialchars(implode(', ', $response_keys["error-codes"])) : 'Ninguno') . "</p>" .
            "<p><a href='javascript:history.back()'>Volver atrás e intentar de nuevo</a></p>");
    }

    // Datos del formulario
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    $empresa = "contabilidad@estudiowilkoriski.uy";  
    $asunto = "Nuevo mensaje desde formulario web";
    
    // Mail al estudio
    $cuerpo = "Nombre: $nombre\nCorreo: $email\nTelefono-celular: $telefono\nMensaje:\n $mensaje";

    $headers = "From: contabilidad@estudiowilkoriski.uy\r\n";
    $headers .= "Reply-To: $email\r\n";
    mail($empresa, $asunto, $cuerpo, $headers);
    
    // Mail respuesta automatica
    $asuntoConfirm = "Hemos recibido tu mensaje";
    $mensajeConfirm = "Hola $nombre,\n\nTu mensaje ha sido recibido correctamente.\nTe responderemos a la brevedad.\nWilkoriski, Ferrua y Asociados SRL";
    $headers = "From: contabilidad@estudiowilkoriski.uy";
    mail($email, $asuntoConfirm, $mensajeConfirm, $headers);

    header("Location: contacto.html?success=1");
    exit;
}
?>