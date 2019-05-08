<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
//include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/forgot_password.php");

class UpdateForgotPassword 
{
	function __construct($forgot_password_token,$password) 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

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
		}

        }
}
$forgot_password_token = $_GET['forgot_password_token'];
$password = $_GET['password'];

$updateForgotPassword = new UpdateForgotPassword($forgot_password_token,$password);	
?>
