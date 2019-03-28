<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class ForgotPassword extends Mail 
{
	function __construct($email,$url) 
	{
		try 
		{
			parent::__construct();
			$this->mPhpMailer->setFrom('jbreslin33@gmail.com', 'Mailer');
			$this->mPhpMailer->addAddress('jbreslin33@yahoo.com', 'Jim breslin');     // Add a recipient
			$this->mPhpMailer->addReplyTo('info@example.com', 'Information');
			
			$this->mPhpMailer->isHTML(true);                                  // Set email format to HTML
			$this->mPhpMailer->Subject = 'Forgot Password';
			$body = "Click this link:";
			$body .= $url;
			$this->mPhpMailer->Body    = $body;
			$this->mPhpMailer->AltBody = $body;

			$this->mPhpMailer->send();
    			echo 'Message has been sent';
		} 
		catch (Exception $e) 
		{
    			echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
		}
        }
}

?>
