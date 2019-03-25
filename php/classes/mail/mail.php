<?php 
require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require '/usr/share/php/libphp-phpmailer/class.smtp.php';

//Load Composer's autoloader
require 'vendor/autoload.php';

class Mail 
{
	function __construct() 
	{
		//$this->mOneRing = 's%%xqc!___bzvReT423*&';
		$this->mPhpMailer = new PHPMailer(true);                              // Passing `true` enables exceptions
    		$this->mPhpMailer->SMTPDebug = 2;                                 // Enable verbose debug output
    		$this->mPhpMailer->isSMTP();                                      // Set mailer to use SMTP
		
		//$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    		$this->mPhpMailer->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    		$this->mPhpMailer->SMTPAuth = true;                               // Enable SMTP authentication
    		$this->mPhpMailer->Username = 'jbreslin33@gmail.com';                 // SMTP username
    		$this->mPhpMailer->Password = 'Star5567';                           // SMTP password
    		$this->mPhpMailer->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    		$this->mPhpMailer->Port = 587;                                    // TCP port to connect to

    		$this->mPhpMailer->setFrom('jbreslin33@gmail.com', 'Mailer');
    		$this->mPhpMailer->addAddress('jbreslin33@yahoo.com', 'Jim breslin');     // Add a recipient
    		$this->mPhpMailer->addReplyTo('info@example.com', 'Information');
		
		$this->mPhpMailer->isHTML(true);                                  // Set email format to HTML
    		$this->mPhpMailer->Subject = 'Here is the subject';
    		$this->mPhpMailer->Body    = 'This is the HTML message body <b>in bold!</b>';
    		$this->mPhpMailer->AltBody = 'This is the body in plain text for non-HTML mail clients';

    		$this->mPhpMailer->send();
    		echo 'Message has been sent';
		} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
        }
}
?>


<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
//use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\Exception;

require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require '/usr/share/php/libphp-phpmailer/class.smtp.php';

//Load Composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    //$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'jbreslin33@gmail.com';                 // SMTP username
    $mail->Password = 'Star5567';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('jbreslin33@gmail.com', 'Mailer');
    $mail->addAddress('jbreslin33@yahoo.com', 'Jim breslin');     // Add a recipient
    //$mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>

