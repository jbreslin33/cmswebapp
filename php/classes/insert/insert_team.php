<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertTeam 
{
	function __construct() 
	{

		//handle variables from sender's javascript
		$name = null;
		$club_id = null;
		$jwt = null;
	
		if (isset($_GET['name']))
		{
			$name = $_GET['name'];
		}
		if (isset($_GET['club_id']))
		{
			$club_id = $_GET['club_id'];

		}
		if (isset($_GET['jwt']))
		{
			$jwt = $_GET['jwt'];
		}

		//prep db
                $database = new Database("localhost","cms","postgres","mibesfat");
		$sql = 'select f_insert_team($1,$2,$3)';
		$prepare_result = pg_prepare($database->mConnection, "f_insert_team", $sql);

		//get id of sender
		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		$person_id = $payload->person_id;

		//result for sender
		$result = pg_execute($database->mConnection, "f_insert_team", array( $name ,$club_id, $person_id));
               	$return_value = pg_fetch_result($result, 0);
                echo $return_value;
        }
}

$insertTeam = new InsertTeam();	

?>
