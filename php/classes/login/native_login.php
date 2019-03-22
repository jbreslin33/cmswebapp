<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");

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
		error_log($txt);

		if ($return_value > 0)
		{
			//encode
			$secret = 's%%xqc!___bzvReT423*&';
			$id = $return_value;
			$encoded_token = array();
			$encoded_token['id'] = $id;

			$jwt = JWT::encode($encoded_token, $secret);
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
