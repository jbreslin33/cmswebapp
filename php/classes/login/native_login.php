<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");

class NativeLogin
{
        function __construct()
        {
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_native_login($1,$2)';

                $prepare_result = pg_prepare($database->mConnection, "f_native_login", $sql);

                $result = pg_execute($database->mConnection, "f_native_login", array( $_GET['email'] ,$_GET['password']));

		//return to client
                $return_code = pg_fetch_result($result, 0);

		if ($return_code < -100  && $return_code > -200)
		{
			echo $return_code;
		}
		else
		{

			//jwt code
			// Create token header as a JSON string
			$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

			// Create token payload as a JSON string
			$payload = json_encode(['user_id' => 123]);

			// Encode Header to Base64Url String
			$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

			// Encode Payload to Base64Url String
			$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

			// Create Signature Hash
			$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);

			// Encode Signature to Base64Url String
			$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

			// Create JWT
			$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

			echo "-100," . $jwt;
		}
        }
}
        $nativeLogin = new NativeLogin();
?>
