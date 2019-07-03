<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertGame 
{
	function __construct() 
	{

		//handle variables from sender's javascript
		$jwt = null;
		$team_id = null;
		$event_date = null;
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
		if (isset($_GET['team_id']))
		{
			$team_id = $_GET['team_id'];
		}
		if (isset($_GET['event_date']))
		{
			$event_date = $_GET['event_date'];
		}
		if (isset($_GET['arrival_time']))
		{
			$arrival_time = $_GET['arrival_time'];
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

		error_log($field_name);

		//insert
		if ($event_date)
		{
			//prep db
                	$database = new Database("localhost","cms","postgres","mibesfat");
			$sql = 'select f_insert_game($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';
			$prepare_result = pg_prepare($database->mConnection, "f_insert_game", $sql);

			$oneRing = new OneRing();
                	$payload = JWT::decode($jwt, $oneRing->mOneRing);
			$email_id = $payload->email_id;

			//result for sender
			$result = pg_execute($database->mConnection, "f_insert_game", array( $email_id, $team_id, $event_date, $arrival_time, $start_time, $end_time, $address, $coordinates, $pitch_id, $field_name));
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

$insertGame = new InsertGame();	

?>
