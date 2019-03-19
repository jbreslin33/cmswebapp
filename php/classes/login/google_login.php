<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");

class GoogleLogin
{
        function __construct()
        {
		$id_token = $_GET['id_token'];
                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_google_login($1,$2,$3,$4,$5)';

                $prepare_result = pg_prepare($database->mConnection, "f_google_login", $sql);

                $result = pg_execute($database->mConnection, "f_google_login", array( $_GET['email'] ,$_GET['google_id'], $_GET['id_token'], $_GET['first_name'], $_GET['last_name']));

		//return to client
                $return_value = pg_fetch_result($result, 0);

               	if ($return_value < -100  && $return_value > -200)
                {
                        echo $return_value;
                }
                else
                {
                        //encode
                        $secret = 's%%xqc!___bzvReT423*&';
                        $id = $return_value;
                        $encoded_token = array();
                        $encoded_token['id'] = $id;
                        $jwt = JWT::encode($encoded_token, $secret);
                        error_log($jwt);
                        echo "-100," . $jwt;
                }

        }
}
        $googleLogin = new GoogleLogin();
?>
