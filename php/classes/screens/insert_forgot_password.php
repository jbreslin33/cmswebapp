<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class InsertForgotPassword extends Screen
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		//create mail
		$email = $_GET['email'];
		$this->mSubject = "Forgot Password Link";
		$this->mAbsoluteURL = "http://elacore.org/#update_forgot_password_screen&";
		$this->mForgotPasswordToken = bin2hex(random_bytes(32));
		
		$this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
    			'forgot_password_token' => $this->mForgotPasswordToken,
    			'email' => $email
			]));
		$this->mBody = "Click the link to change password: ";
		$this->mBody .= $this->mUrl; 

                $sql = 'select f_insert_forgot_password($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_forgot_password", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_forgot_password", array( $email, $this->mForgotPasswordToken));

		$mail = new Mail($email,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);
        }
}

$insertForgotPassword = new InsertForgotPassword();	

?>
