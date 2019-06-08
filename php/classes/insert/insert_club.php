<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertClub 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		//actually we are going to get the jwt and need to extract id

		$sql = 'select f_insert_club($1,$2,$3)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_club", $sql);

		$jwt = $_GET['jwt'];
		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		$email_person_id = $payload->email_person_id;

		$result = pg_execute($database->mConnection, "f_insert_club", array( $_GET['name'] ,$_GET['address'], $email_person_id));

               	$return_value = pg_fetch_result($result, 0);

                echo $return_value;
        }
}

$insertClub = new InsertClub();	

?>
