<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");
header('Content-Type: application/json');

class SelectPitches
{
        function __construct()
        {
                $jwt = null;
                $team_id = null;
                if (isset($_GET['jwt']))
               	{
                        $jwt = $_GET['jwt'];
                }

                if (isset($_GET['club_id']))
                {
                        $club = $_GET['club_id'];
                }

		//dont use this other than logged in check.....
                $jwt = $_GET['jwt'];
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $email_id = $payload->email_id;

                $database = new Database("localhost","cms","postgres","mibesfat");
                $sql = 'select f_select_pitches($1)';
                $prepare_result = pg_prepare($database->mConnection, "f_select_pitches", $sql);

                $result = pg_execute($database->mConnection, "f_select_pitches", array( $club_id));

                $return_value = pg_fetch_result($result, 0);
		
		$result_set = $database->formatResultSet($return_value);
                echo $result_set;
	}
}

$selectPitches = new SelectPitches();
?>
