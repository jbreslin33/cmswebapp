<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class GoogleLogin
{
        function __construct()
        {
		error_log("in google login");
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_google_login($1,$2,$3,$4,$5)';

                $prepare_result = pg_prepare($database->mConnection, "f_google_login", $sql);

                $result = pg_execute($database->mConnection, "f_google_login", array( $_GET['email'] ,$_GET['google_id'], $_GET['id_token'], $_GET['first_name'], $_GET['last_name']));

		//return to client
                echo pg_fetch_result($result, 0);
        }
}
        $googleLogin = new GoogleLogin();
?>
