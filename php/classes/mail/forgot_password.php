<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class ForgotPassword extends Mail 
{
	function __construct() 
	{
		//$this->mOneRing = 's%%xqc!___bzvReT423*&';
		try 
		{
			parent::__construct();
			$this->mPhpMailer->setFrom('jbreslin33@gmail.com', 'Mailer');
			$this->mPhpMailer->addAddress('jbreslin33@yahoo.com', 'Jim breslin');     // Add a recipient
			$this->mPhpMailer->addReplyTo('info@example.com', 'Information');
			
			$this->mPhpMailer->isHTML(true);                                  // Set email format to HTML
			$this->mPhpMailer->Subject = 'Forgot Password';
			$this->mPhpMailer->Body    = 'Enter new password: <b>in bold!</b>';
			$this->mPhpMailer->AltBody = 'Alt Body';

			$this->mPhpMailer->send();
    			echo 'Message has been sent';
		} 
		catch (Exception $e) 
		{
    			echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
		}
        }
}

//$email = $_GET['email'];
//$forgotPassword = new ForgotPassword($email);
$forgotPassword = new ForgotPassword();

?>
