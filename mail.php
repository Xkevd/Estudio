<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validar reCAPTCHA v2
    $recaptcha_secret = "6LfBqGotAAAAAFX9PBkuq7ktAzmOiYsVwwCxRFj6";
    $recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    if (empty($recaptcha_response)) {
        header("Location: contacto.html?error=captcha_empty");
        exit;
    }

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    );

    $response = false;

    // Intentar usando cURL primero
    if (function_exists('curl_version')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $response = curl_exec($ch);
        curl_close($ch);
    } 
    // Fallback a file_get_contents si allow_url_fopen está activado
    else if (ini_get('allow_url_fopen')) {
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

    if ($response === false) {
        // Error de conexión con los servidores de Google o configuración del hosting
        header("Location: contacto.html?error=captcha_failed");
        exit;
    }

    $response_keys = json_decode($response, true);

    if (!$response_keys["success"]) {
        header("Location: contacto.html?error=captcha_failed");
        exit;
    }

    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    $empresa = "contabilidad@estudiowilkoriski.uy";  
    $asunto = "Nuevo mensaje desde formulario web";
    
    //Mail al estudio
    $cuerpo = "Nombre: $nombre\nCorreo: $email\nTelefono-celular: $telefono\nMensaje:\n $mensaje";

    $headers = "From: contabilidad@estudiowilkoriski.uy\r\n";
    $headers .= "Reply-To: $email\r\n";
    mail($empresa, $asunto, $cuerpo, $headers);
    
    //Mail respuesta automatica
    $asuntoConfirm = "Hemos recibido tu mensaje";
    $mensajeConfirm = "Hola $nombre,\n\nTu mensaje ha sido recibido correctamente.\nTe responderemos a la brevedad.\nWilkoriski, Ferrua y Asociados SRL";
    $headers = "From: contabilidad@estudiowilkoriski.uy";
    mail($email, $asuntoConfirm, $mensajeConfirm, $headers);

    header("Location: contacto.html?success=1");
    exit;
}
?>