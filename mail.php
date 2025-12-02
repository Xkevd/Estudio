<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    $empresa = "tucorreo@tu-dominio.com";  
    $asunto = "Nuevo mensaje desde formulario web";
    
    //Mail al estudio
    $cuerpo = "Nombre: $nombre\nCorreo: $email\nTelefono-celular: $telefono\nMensaje:\n $mensaje";

    $headers = "From: $email";
    mail($empresa, $asunto, $cuerpo, $headers);
    
    //Mail respuesta automatica
    $asuntoConfirm = "Hemos recibido tu mensaje";
    $mensajeConfirm = "Hola $nombre,\n\nTu mensaje ha sido recibido correctamente.\nTe responderemos a la brevedad.\nWilkoriski, Ferrua y Asociados SRL";
    $headers = "From: contacto@estudiowilkoriski.com";
    mail($email, $asuntoConfirm, $mensajeConfirm, $headers);

    header("Location: contacto.html");
exit;
}

?>