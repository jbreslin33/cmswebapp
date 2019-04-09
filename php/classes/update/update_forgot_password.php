<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/forgot_password.php");

class UpdateForgotPassword 
{
	function __construct($selector,$token,$password) 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_update_forgot_password($1,$2,$3)';

                $prepare_result = pg_prepare($database->mConnection, "f_update_forgot_password", $sql);

                $result = pg_execute($database->mConnection, "f_update_forgot_password", array( $selector ,$token, $password));

                $return_value = pg_fetch_result($result, 0);
		error_log($return_value);

                echo $return_value;
        }
}
$selector = $_GET['selector'];
$token = $_GET['token'];
$password = $_GET['password'];

$updateForgotPassword = new UpdateForgotPassword($selector,$token,$password);	
?>
