<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class UpdateForgotPassword extends Screen
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$forgot_password_token = $_GET['forgot_password_token'];
		$password = $_GET['password'];
		//$email = $_GET['email'];
		$email = "jbreslin33@yahoo.com";
		
		//mail that you changed password
               	$this->mEmail = $email;
               	$this->mSubject = "Password has been changed.";
               	$this->mURL = "http://elacore.org/#insert_forgot_password_screen";
		$this->mBody = "You have recently changed your password. If this was not you. Click here: ";
		$this->mBody .= $this->mURL;

                $sql = 'select f_update_forgot_password($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_forgot_password", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_forgot_password", array( $forgot_password_token, $password));
		
		$mail = new Mail($this->mEmail,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);
	}
}
$updateForgotPassword = new UpdateForgotPassword();	
?>
