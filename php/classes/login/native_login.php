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

		//return to client
                $return_value = pg_fetch_result($result, 0);

		$txt = "return_value:" . $return_value;

		if ($return_value < -100 && > -200)
		{
			echo $return_value;
		}
		else
		{

			//encode
			$oneRing = new OneRing();

			$person_id = $return_value;
			$encoded_token = array();
			$encoded_token['person_id'] = $person_id;

			$jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
			echo "-100," . $jwt . "," . $return_value;
		}
        }
}
        $nativeLogin = new NativeLogin();
?>
