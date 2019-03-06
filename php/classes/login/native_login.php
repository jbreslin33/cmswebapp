<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class NativeLogin
{
        function __construct()
        {
		error_log("here in login");

                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_native_login($1,$2)';

                $prepare_result = pg_prepare($database->mConnection, "f_native_login", $sql);

                $result = pg_execute($database->mConnection, "f_native_login", array( $_GET['email'] ,$_GET['password']));

		//return to client
                echo pg_fetch_result($result, 0);
        }
}
        $nativeLogin = new NativeLogin();
?>
