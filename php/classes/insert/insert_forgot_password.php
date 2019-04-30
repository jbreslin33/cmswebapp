<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class InsertForgotPassword 
{
	function __construct($email) 
	{

                $database = new Database("localhost","cms","postgres","mibesfat");

		//create mail
		$this->mEmail = $email;
		$this->mSubject = "Forgot Password Link";
		$this->mAbsoluteURL = "http://elacore.org/#update_forgot_password_screen&";
		$this->mSelector = bin2hex(random_bytes(8));
		$this->mToken = bin2hex(random_bytes(32));
		
		$this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
    			'selector' => $this->mSelector,
    			'token' => $this->mToken
			]));

		//insert
                $sql = 'select f_insert_forgot_password($1,$2,$3)';
                $prepare_result = pg_prepare($database->mConnection, "f_insert_forgot_password", $sql);
                $result = pg_execute($database->mConnection, "f_insert_forgot_password", array( $this->mEmail ,$this->mSelector, $this->mToken));

		//result to user
                $return_value = pg_fetch_result($result, 0);
		$return_value .= ",";
                echo $return_value;

		//send mail
		$mail = new Mail($this->mEmail, $this->mUrl,$this->mSubject);
        }
}
$email = $_GET['email'];

$insertForgotPassword = new InsertForgotPassword($email);	

?>
