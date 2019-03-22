<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");

class InsertClub 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		//actually we are going to get the jwt and need to extract id

		$sql = 'select f_insert_club($1,$2,$3)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_club", $sql);



		//jwt
		//decode
                $secret = 's%%xqc!___bzvReT423*&';
		$jwt = $_GET['jwt'];
                $payload = JWT::decode($jwt, $secret);
		$txt = "txt:" . $payload->id;
		error_log($txt);
		/*
                $id = $return_value;
                $encoded_token = array();
                $encoded_token['id'] = $id;
                $jwt = JWT::encode($encoded_token, $secret);
                error_log($jwt);
                echo "-100," . $jwt;
		 */


		$result = pg_execute($database->mConnection, "f_insert_club", array( $_GET['name'] ,$_GET['address'], 1));

               	$return_value = pg_fetch_result($result, 0);

                echo $return_value;
        }
}

$insertClub = new InsertClub();	

?>
