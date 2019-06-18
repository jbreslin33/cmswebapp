<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class DeletePerson 
{
	function __construct() 
	{
		$person_id = null;
		$jwt = null;

               	if (isset($_GET['person_id']))
                {
                        $person_id = $_GET['person_id'];
                }
               	if (isset($_GET['jwt']))
                {
                        $jwt = $_GET['jwt'];
                }

                $database = new Database("localhost","cms","postgres","mibesfat");

		//actually we are going to get the jwt and need to extract id

		$sql = 'select f_delete_person($1,$2)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_delete_person", $sql);

		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		$email_id = $payload->email_id;

		$result = pg_execute($database->mConnection, "f_delete_person", array( $email_id, $person_id));

               	$return_value = pg_fetch_result($result, 0);

		$result_set = $database->formatResultSet($return_value);
                echo $result_set;
        }
}

$deletePerson = new DeletePerson();	

?>
