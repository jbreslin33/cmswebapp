<?php 
require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require '/usr/share/php/libphp-phpmailer/class.smtp.php';

//Load Composer's autoloader
require '../../../vendor/autoload.php';

class Mail 
{
	function __construct() 
	{
		//$this->mOneRing = 's%%xqc!___bzvReT423*&';
		try 
		{
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
		} 
		catch (Exception $e) 
		{
    			echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
		}
        }
}

$mail = new Mail();

?>
