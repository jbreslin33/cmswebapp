<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class NativeLogin
{
        function __construct()
        {
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_native_login($1,$2)';
                $prepare_result = pg_prepare($database->mConnection, "f_native_login", $sql);
                $result = pg_execute($database->mConnection, "f_native_login", array( $_GET['email'] ,$_GET['password']));


                $return_value = pg_fetch_result($result, 0);

		error_log($return_value);
		$return_value_array = explode(",",$return_value);
		$email_person_id = array_shift($return_value_array);
		$data = implode(",",$return_value_array);

		error_log("got this:");
		error_log($email_person_id);
		error_log($data);
		
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
				error_log($txt);
				echo $txt;
			}
        	}
	}
}
        $nativeLogin = new NativeLogin();
?>
