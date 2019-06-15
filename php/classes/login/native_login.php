<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class NativeLogin
{
        function __construct($email,$password)
        {
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_native_login($1,$2)';
                $prepare_result = pg_prepare($database->mConnection, "f_native_login", $sql);
                $result = pg_execute($database->mConnection, "f_native_login", array( $email,$password));

                $return_value = pg_fetch_result($result, 0);

                $result_set = $database->formatResultSet($return_value);
                echo $result_set;
	}
}

$email = $_GET['email']; 
$password = $_GET['password']; 

$nativeLogin = new NativeLogin($email,$password);
?>
