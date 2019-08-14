<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class InsertNativeEmailLogin extends Screen 
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
                //$this->mAbsoluteURL = "http://elacore.org/#update_forgot_password_screen&";
                $this->mAbsoluteURL = "http://elacore.org/#insert_native_login_screen&";
                $this->mForgotPasswordToken = bin2hex(random_bytes(32));

                $this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
                        'forgot_password_token' => $this->mForgotPasswordToken,
                        'email' => $email
                        ]));
                $this->mBody = "Click the link to join Club Management System: ";
                $this->mBody .= $this->mUrl;

                $sql = 'select f_insert_join_email($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_join_email", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_insert_join_email", array( $email, $this->mForgotPasswordToken));

                $mail = new Mail($email,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);

//old

		$sql = 'select f_insert_native_email_login($1)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_native_email_login", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_insert_native_email_login", array( $_GET['email']));
                return pg_fetch_result($result, 0);
	}
}

$insertNativeEmailLogin = new InsertNativeEmailLogin();	

?>
