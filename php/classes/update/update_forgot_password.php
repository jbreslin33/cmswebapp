<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class UpdateForgotPassword 
{
	function __construct($forgot_password_token,$password) 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");
		error_log($forgot_password_token);
		error_log($password);

                $sql = 'select f_update_forgot_password($1,$2)';

                $prepare_result = pg_prepare($database->mConnection, "f_update_forgot_password", $sql);

                $result = pg_execute($database->mConnection, "f_update_forgot_password", array( $forgot_password_token, $password));

                $return_value = pg_fetch_result($result, 0);

		if ($return_value == "-112")
		{
                	echo $return_value;
		}
		else
		{
			echo "-100";	

			//mail that you changed password
                	$this->mEmail = $return_value;
                	$this->mSubject = "Password has been changed.";
                	$this->mURL = "http://elacore.org/#insert_forgot_password_screen";
			$this->mBody = "You have recently changed your password. If this was not you. Click here: ";
			$this->mBody .= $this->mURL;
                	$mail = new Mail($this->mEmail,$this->mSubject,$this->mBody);
		}

        }
}
$forgot_password_token = $_GET['forgot_password_token'];
$password = $_GET['password'];

$updateForgotPassword = new UpdateForgotPassword($forgot_password_token,$password);	
?>
