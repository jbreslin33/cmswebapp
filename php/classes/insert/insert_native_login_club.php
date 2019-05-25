<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class InsertNativeLoginClub 
{
	function __construct() 
	{
                $database = new Database("localhost","cms","postgres","mibesfat");

		$sql = 'select f_insert_native_login_club($1,$2,$3,$4,$5,$6,$7)';
		
		$prepare_result = pg_prepare($database->mConnection, "f_insert_native_login_club", $sql);
		
		$result = pg_execute($database->mConnection, "f_insert_native_login_club", array( $_GET['password'], $_GET['first_name'], $_GET['middle_name'], $_GET['last_name'], $_GET['phone'], $_GET['address'], $_GET['club_invite_token']));

		$return_value = pg_fetch_result($result, 0); 
		error_log($return_value);

               	if ($return_value < -100  && $return_value > -200)
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
                        echo "-100," . $jwt;
                }
        }
}
	$insertNativeLoginClub = new InsertNativeLoginClub();	
?>
