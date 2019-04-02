<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/forgot_password.php");

class InsertForgotPassword 
{
	function __construct($email) 
	{
		$this->mEmail = $email;

                $database = new Database("localhost","cms","postgres","mibesfat");

		//$this->mAbsoluteURL = "http://elacore.org/#update_forgot_password_screen&selector=123&token=123";
		$this->mAbsoluteURL = "http://elacore.org/#update_forgot_password_screen&";

		$this->mSelector = bin2hex(random_bytes(8));

		$this->mToken = bin2hex(random_bytes(32));
/*
		$this->mUrl = sprintf('%s?%s', $this->mAbsoluteURL, http_build_query([
    			'selector' => $this->mSelector,
    			'token' => $this->mToken
			]));
 */

		//$this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, '');
		
		$this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
    			'selector' => $this->mSelector,
    			'token' => $this->mToken
			]));

		error_log($this->mUrl);

                $sql = 'select f_insert_forgot_password($1,$2,$3)';

                $prepare_result = pg_prepare($database->mConnection, "f_insert_forgot_password", $sql);

                $result = pg_execute($database->mConnection, "f_insert_forgot_password", array( $this->mEmail ,$this->mSelector, $this->mToken));

                $return_value = pg_fetch_result($result, 0);

                echo $return_value;


		$forgotPassword = new ForgotPassword($this->mEmail, $this->mUrl);

		//$message .= sprintf('<a href="%s">%s</a></p>', $url, $url);
        }
}
$email = $_GET['email'];

$insertForgotPassword = new InsertForgotPassword($email);	

?>
