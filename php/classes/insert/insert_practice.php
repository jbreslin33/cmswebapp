<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertTeam 
{
	function __construct() 
	{

		//handle variables from sender's javascript
		$jwt = null;
		$club_id = null;
		$person_id = null;
		$name = null;
	
		if (isset($_GET['jwt']))
		{
			$jwt = $_GET['jwt'];
		}
		if (isset($_GET['club_id']))
		{
			$club_id = $_GET['club_id'];
		}
		if (isset($_GET['person_id']))
		{
			$person_id = $_GET['person_id'];
		}
		if (isset($_GET['name']))
		{
			$name = $_GET['name'];
		}

		//prep db
                $database = new Database("localhost","cms","postgres","mibesfat");
		$sql = 'select f_insert_team($1,$2,$3,$4)';
		$prepare_result = pg_prepare($database->mConnection, "f_insert_team", $sql);

		//get id of sender
		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		$email_id = $payload->email_id;

		//result for sender
		$result = pg_execute($database->mConnection, "f_insert_team", array( $email_id, $club_id, $person_id, $name));
               	$return_value = pg_fetch_result($result, 0);

                $result_set = $database->formatResultSet($return_value);
                echo $result_set;
        }
}

$insertTeam = new InsertTeam();	

?>
