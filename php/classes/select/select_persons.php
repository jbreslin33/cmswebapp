<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");
header('Content-Type: application/json');

class SelectPersons
{
        function __construct()
        {
                $jwt = $_GET['jwt'];
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                $email_id = $payload->email_id;

                $database = new Database("localhost","cms","postgres","mibesfat");
                $sql = 'select f_select_person($1)';
                $prepare_result = pg_prepare($database->mConnection, "f_select_person", $sql);

                $result = pg_execute($database->mConnection, "f_select_person", array( $email_id));

                $return_value = pg_fetch_result($result, 0);
		
		$result_set = $database->formatResultSet($return_value);
                echo $result_set;
	}
}

$selectPersons = new SelectPersons();
?>
