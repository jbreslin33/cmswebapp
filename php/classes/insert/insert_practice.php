<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertPractice 
{
	function __construct() 
	{

		//handle variables from sender's javascript
		$jwt = null;
		$club_id = null;
		$team_id = null;
		$person_id = null;
		$date = null;
		$arrival_time = null;
		$start_time = null;
		$end_time = null;
		$address = null;
		$coordinates = null;
		$pitch_id = null;
		$field_name = null;
	
		if (isset($_GET['jwt']))
		{
			$jwt = $_GET['jwt'];
		}
		if (isset($_GET['club_id']))
		{
			$club_id = $_GET['club_id'];
		}
		if (isset($_GET['team_id']))
		{
			$team_id = $_GET['team_id'];
		}
		if (isset($_GET['person_id']))
		{
			$person_id = $_GET['person_id'];
		}
		if (isset($_GET['date']))
		{
			$date = $_GET['date'];
		}
		if (isset($_GET['arrival_time']))
		{
			$arrivalTime = $_GET['arrival_time'];
		}
		if (isset($_GET['start_time']))
		{
			$start_time = $_GET['start_time'];
		}
		if (isset($_GET['end_time']))
		{
			$end_time = $_GET['end_time'];
		}
		if (isset($_GET['address']))
		{
			$address = $_GET['address'];
		}
		if (isset($_GET['coordinates']))
		{
			$coordinates = $_GET['coordinates'];
		}
		if (isset($_GET['pitch_id']))
		{
			$pitch_id = $_GET['pitch_id'];
		}
		if (isset($_GET['field_name']))
		{
			$field_name = $_GET['field_name'];
		}

		//insert
		if ($date)
		{
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
		//get pitches
		else
		{

		}
        }
}

$insertTeam = new InsertTeam();	

?>
