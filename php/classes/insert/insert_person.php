<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertPerson 
{
	function __construct() 
	{
		$first_name = null;
		$middle_name = null;
		$last_name = null;
		$phone_name = null;
		$address_name = null;
		$jwt = null;

               	if (isset($_GET['first_name']))
                {
                        $first_name = $_GET['first_name'];
                }
               	if (isset($_GET['middle_name']))
                {
                        $middle_name = $_GET['middle_name'];
                }
               	if (isset($_GET['last_name']))
                {
                        $last_name = $_GET['last_name'];
                }
               	if (isset($_GET['phone']))
                {
                        $phone = $_GET['phone'];
                }
               	if (isset($_GET['address']))
                {
                        $address = $_GET['address'];
                }
               	if (isset($_GET['jwt']))
                {
                        $jwt = $_GET['jwt'];
                }

                $database = new Database("localhost","cms","postgres","mibesfat");

		//actually we are going to get the jwt and need to extract id

		$sql = 'select f_insert_person($1,$2,$3,$4,$5,$6)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_person", $sql);

		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		$email_person_id = $payload->email_person_id;

		$result = pg_execute($database->mConnection, "f_insert_person", array( $first_name, $middle_name, $last_name, $phone, $address, $email_person_id));

               	$return_value = pg_fetch_result($result, 0);

                echo $return_value;
        }
}

$insertPerson = new InsertPerson();	

?>
