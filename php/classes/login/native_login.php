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
	}
/*
                if ($return_value < -100  && $return_value > -200)
                {
                        echo $return_value;
                }
                else
		{
                	$sqlA = 'select f_native_login_select persons($1)';
                	$prepare_resultA = pg_prepare($database->mConnection, "f_native_login_select_persons", $sql);
//			   $result = pg_execute($database->mConnection, "f_google_login", array( $email ,$google_id, $id_token, $first_name, $last_name, $club_invite_token));

                	//$resultA = pg_execute($database->mConnection, "f_native_login_select_persons", array($return_value));
                	$resultA = pg_execute($database->mConnection, "f_native_login_select_persons", array(1));

			$data = "";
			$email_person_id = null;
			$email_person_person_id = null;
                	while ($row = pg_fetch_row($resultA))
                	{
                        	$data .= $row[0];
                	}
		
			if ($data)
			{
				$decoded_data = json_decode($data);

				if ($data < -101 && $data > -200)
				{
					echo $data;
				}
				else
				{
					//encode
					$oneRing = new OneRing();

					$encoded_token = array();
					$encoded_token['email_person_id'] = $decoded_data[0]->email_person_id;
					$encoded_token['email_person_person_id'] = null;

					$front = '{ "persons" :';
                			$back = '}';

                			$return_value = "";
                			$return_value .= $front;
                			$return_value .= $data;
                			$return_value .= $back;

					$jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
					$txt =  "-100," . $jwt . "," . $return_value;
					error_log($txt);
					echo $txt;
				}
			}
        	}
	}
 */
}
        $nativeLogin = new NativeLogin();
?>
