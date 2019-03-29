<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/forgot_password.php");

class UpdateForgotPassword 
{
	function __construct($selector,$token) 
	{
		$txt = $selector;
		$txt .= "BBBBBBBBBBBBBB";
		$txt .= $token;
		error_log($txt);
		/*
		$this->mEmail = $email;

                $database = new Database("localhost","cms","postgres","mibesfat");

		$this->mAbsoluteURL = "http://elacore.org/#insert_forgot_password_screen/";

		$this->mSelector = bin2hex(random_bytes(8));

		$this->mToken = bin2hex(random_bytes(32));

		$this->mUrl = sprintf('%sreset.php?%s', $this->mAbsoluteURL, http_build_query([
    			'selector' => $this->mSelector,
    			'validator' => bin2hex($this->mToken)
			]));

		error_log($this->mUrl);

                $sql = 'select f_insert_forgot_password($1,$2,$3)';

                $prepare_result = pg_prepare($database->mConnection, "f_insert_forgot_password", $sql);

                $result = pg_execute($database->mConnection, "f_insert_forgot_password", array( $this->mEmail ,$this->mSelector, $this->mToken));

                $return_value = pg_fetch_result($result, 0);

                echo $return_value;


		$forgotPassword = new ForgotPassword($this->mEmail, $this->mUrl);
		 */

		//$message .= sprintf('<a href="%s">%s</a></p>', $url, $url);
        }
}
$selector = $_GET['selector'];
$token = $_GET['token'];

$updateForgotPassword = new UpdateForgotPassword($selector,$token);	

?>
