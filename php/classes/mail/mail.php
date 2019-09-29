<?php 
require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require '/usr/share/php/libphp-phpmailer/class.smtp.php';

//Load Composer's autoloader
require '../../../vendor/autoload.php';

class Mail 
{
	function __construct($email,$subject,$body) 
	{
		$this->mEmail = $email;
		$this->mSubject = $subject;
		$this->mBody = $body;

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
    			$this->mPhpMailer->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    			$this->mPhpMailer->Port = 465;                                    // TCP port to connect to

			//from old forgot password
		        $this->mPhpMailer->setFrom('jbreslin33@gmail.com', 'Mailer');
                       	$this->mPhpMailer->addAddress($this->mEmail, 'Jim breslin');     // Add a recipient
                        $this->mPhpMailer->addReplyTo('info@example.com', 'Information');

                        $this->mPhpMailer->isHTML(true);                                  // Set email format to HTML
                        $this->mPhpMailer->Subject = $this->mSubject;
			$this->mPhpMailer->Body    = $body;
                        $this->mPhpMailer->AltBody = $body;

                        $this->mPhpMailer->send();
		} 
		catch (Exception $e) 
		{
    			echo 'Message could not be sent. Mailer Error: ', $this->ErrorInfo;
		}
        }
}

?>
