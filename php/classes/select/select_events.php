<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");
header('Content-Type: application/json');

class SelectEvents
{
        function __construct()
        {
                $jwt = null;
                if (isset($_GET['jwt']))
               	{
                        $jwt = $_GET['jwt'];
                }

		//dont use this other than logged in check.....
                $jwt = $_GET['jwt'];
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $email_id = $payload->email_id;

                $database = new Database("localhost","cms","postgres","mibesfat");
                $sql = 'select f_select_events($1)';
                $prepare_result = pg_prepare($database->mConnection, "f_select_events", $sql);

                $result = pg_execute($database->mConnection, "f_select_events", array( $email_id));

                $return_value = pg_fetch_result($result, 0);
		
		$result_set = $database->formatResultSet($return_value);
                echo $result_set;
	}
}

$selectEvents = new SelectEvents();
?>
