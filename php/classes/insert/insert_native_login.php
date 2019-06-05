<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertNativeLogin 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select f_insert_native_login($1,$2,$3,$4,$5,$6,$7)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_native_login", $sql);
		
		$result = pg_execute($database->mConnection, "f_insert_native_login", array( $_GET['email'] , $_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address']));

		$return_value = pg_fetch_result($result, 0); 

               	if ($return_value < -100  && $return_value > -200)
                {
                        echo $return_value;
                }
                else
                {
                        //encode
			$oneRing = new OneRing();
                        $email_person_id = $return_value;
                        $encoded_token = array();
                        $encoded_token['email_person_id'] = $email_person_id;
                        $encoded_token['email_person_person_id'] = null;
                        $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
                        echo "-100," . $jwt;
                }

		//BEGIN
		/*
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_native_login($1,$2)';
                $prepare_result = pg_prepare($database->mConnection, "f_native_login", $sql);
                $result = pg_execute($database->mConnection, "f_native_login", array( $_GET['email'] ,$_GET['password']));

                $return_value = pg_fetch_result($result, 0);

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
		 */	
		//END
        }
}
	$insertNativeLogin = new InsertNativeLogin();	
?>
