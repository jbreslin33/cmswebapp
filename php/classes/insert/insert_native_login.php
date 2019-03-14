<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");

class InsertNativeLogin 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select f_insert_native_login($1,$2,$3,$4,$5,$6,$7)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_native_login", $sql);

		$result = pg_execute($database->mConnection, "f_insert_native_login", array( $_GET['email'] ,$_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address']));

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
                        error_log($jwt);
                        echo "-100," . $jwt;
                }

        }
}
	$insertNativeLogin = new InsertNativeLogin();	
?>
