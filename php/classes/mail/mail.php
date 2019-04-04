<?php 
require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require '/usr/share/php/libphp-phpmailer/class.smtp.php';

//Load Composer's autoloader
require '../../../vendor/autoload.php';

class Mail 
{
	function __construct() 
	{
		try 
		{
			$this->mPhpMailer = new PHPMailer(true);                              // Passing `true` enables exceptions
    			$this->mPhpMailer->SMTPDebug = 0;                                 // Enable verbose debug output
    			$this->mPhpMailer->isSMTP();                                      // Set mailer to use SMTP
		
			//$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    			$this->mPhpMailer->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    			$this->mPhpMailer->SMTPAuth = true;                               // Enable SMTP authentication
    			$this->mPhpMailer->Username = 'jbreslin33@gmail.com';                 // SMTP username
    			$this->mPhpMailer->Password = 'Star5567';                           // SMTP password
    			$this->mPhpMailer->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    			$this->mPhpMailer->Port = 587;                                    // TCP port to connect to
		} 
		catch (Exception $e) 
		{
    			echo 'Message could not be sent. Mailer Error: ', $this->ErrorInfo;
		}
        }
}

$mail = new Mail();

?>
