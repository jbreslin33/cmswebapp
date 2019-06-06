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

               	//$return_value = pg_fetch_result($result, 0);

                //echo $return_value;

		//A
               	$return_value = pg_fetch_result($result, 0);

                if ($return_value < -100  && $return_value > -200)
                {
                        echo $return_value;
                }
                else
                {

                        $return_value_array = explode(",",$return_value);
                        $email_person_id = array_shift($return_value_array);
                        $data = implode(",",$return_value_array);

                        if ($email_person_id < -100  && $email_person_id > -200)
                        {
                                echo $email_person_id;
                        }
                        else
                        {
                                $email_person_person_id = null;

                                if ($data)
                                {
                                        //encode
                                        $oneRing = new OneRing();
                                        $encoded_token = array();
                                        $encoded_token['email_person_id'] = $email_person_id;
                                        $encoded_token['email_person_person_id'] = null;
                                        $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                                        $front = '{ "persons" :';
                                        $back = '}';
                                        $return_value = "";
                                        $return_value .= $front;
                                        $return_value .= $data;
                                        $return_value .= $back;

                                        $txt =  "-100," . $jwt . "," . $return_value;
                                        echo $txt;
                                }
                        }
                }
	
		
		//B
        }
}

$insertPerson = new InsertPerson();	

?>
