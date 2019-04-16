<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class SelectClubAdministratorClubs
{
        function __construct($jwt)
        {
                $jwt = $_GET['jwt'];
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $id = $payload->id;

                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_select_club_administrator_clubs($1)';

                $prepare_result = pg_prepare($database->mConnection, "f_select_club_administrator_clubs", $sql);

                $result = pg_execute($database->mConnection, "f_select_club_administrator_clubs", array( $id));

		//return to client
                $return_value = pg_fetch_result($result, 0);

		$txt = "return_value:" . $return_value;
		error_log($txt);

		if ($return_value)
		{
			echo "-100," . $return_value;
		}
		else
		{
			echo "-100";
		}
        }
}

$_GET['jwt'];

        $nativeLogin = new NativeLogin();
?>
