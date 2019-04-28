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
		$data = "";	
		while ($row = pg_fetch_row($result)) 
		{
  			$data .= $row[0];
		}

                $front = '{ "clubs" :';
                $back = '}';

                $return_value .= $front;
                $return_value .= $data;
                $return_value .= $back;

		if ($data)
		{
			echo "-100," . $return_value;
		}
		else
		{
			echo "-113";
		}
        }
}

$jwt = $_GET['jwt'];

$selectClubAdministratorClubs = new SelectClubAdministratorClubs($jwt);
?>
