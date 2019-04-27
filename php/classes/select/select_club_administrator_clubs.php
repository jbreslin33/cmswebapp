<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");
header('Content-Type: application/json');

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
		$txt = "";	
		while ($row = pg_fetch_row($result)) 
		{
			error_log("how many times");
  			error_log($row[0]);
  			$txt .= $row[0];
  			//error_log($row[1]);
		}
		//echo $txt; 
		/*
                $return_value = pg_fetch_result($result, 0);

		$txt = "return_value:" . $return_value;
		error_log($txt);
		 */

		if ($txt)
		{
			echo "-100," . $txt;
		}
		else
		{
			echo "-100";
		}
        }
}

$jwt = $_GET['jwt'];

$selectClubAdministratorClubs = new SelectClubAdministratorClubs($jwt);
?>
