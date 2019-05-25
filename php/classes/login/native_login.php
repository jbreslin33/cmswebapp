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

		if ($return_value > 0)
		{
			//encode
			$oneRing = new OneRing();

			$user_id = $return_value;
			$encoded_token = array();
			$encoded_token['user_id'] = $user_id;

			$jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
			echo "-100," . $jwt;
		}
		else
		{
			echo $return_value;
		}
        }
}
        $nativeLogin = new NativeLogin();
?>
