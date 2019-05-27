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

		$data = "";
                while ($row = pg_fetch_row($result))
                {
                        $data .= $row[0];
                }

		if ($data)
		{
			if ($data < -101 && $data > -200)
			{
				echo $data;
			}
			else
			{
				//encode
				$oneRing = new OneRing();

				$person_id = $return_value;
				$encoded_token = array();
				$encoded_token['person_id'] = $person_id;

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
        $nativeLogin = new NativeLogin();
?>
