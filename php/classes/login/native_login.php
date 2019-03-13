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

		if ($return_value < -100  && $return_code > -200)
		{
			echo $return_code;
		}
		else
		{
			//encode
			$secret = 's%%xqc!___bzvReT423*&';
			$id = $return_value;
			$encoded_token = array();
			$encoded_token['id'] = $id;

			$jwt = JWT::encode($encoded_token, $secret);



			//decode test
			//$decoded_token = JWT::decode($_POST['token'], 'secret_server_key');
			$decoded_token = JWT::decode($jwt, $secret);
			$text = "id:" . $decoded_token->id;
			error_log($text);

			error_log($jwt);
			echo "-100," . $jwt;

		}
        }
}
        $nativeLogin = new NativeLogin();
?>
