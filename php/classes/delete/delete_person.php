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

		error_log($return_value);

                if ($return_value < -100  && $return_value > -200)
                {
                        echo $return_value;
                }
                else
                {
                        $return_value_array = explode(",",$return_value);
                        $email_id = array_shift($return_value_array);
                        $data = implode(",",$return_value_array);

                        if ($email_id < -100  && $email_id > -200)
                        {
				error_log("A");
                                echo $email_id;
                        }
                        else
                        {
				error_log("B");
                                if ($data)
                                {
					error_log("C");
                                        //encode
                                        $oneRing = new OneRing();
                                        $encoded_token = array();
                                        $encoded_token['email_id'] = $email_id;
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

$deletePerson = new DeletePerson();	

?>
