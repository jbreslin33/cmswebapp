<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class GoogleLogin
{
        function __construct()
        {
		$email = null;
		$google_id = null;
		$id_token = null;
		$first_name = null;
		$last_name = null;
		$club_invite_token = null;
	
		if (isset($_GET['email']))
		{
			$email = $_GET['email'];
		}
		if (isset($_GET['google_id']))
		{
			$google_id = $_GET['google_id'];
		}
		if (isset($_GET['id_token']))
		{
			$id_token = $_GET['id_token'];
		}
		if (isset($_GET['first_name']))
		{
			$first_name = $_GET['first_name'];
		}
		if (isset($_GET['last_name']))
		{
			$last_name = $_GET['last_name'];
		}
		if (isset($_GET['club_invite_token']))
		{
			$club_invite_token = $_GET['club_invite_token'];
		}

                $database = new Database("localhost","cms","postgres","mibesfat");

                $sql = 'select f_google_login($1,$2,$3,$4,$5,$6)';

                $prepare_result = pg_prepare($database->mConnection, "f_google_login", $sql);

                $result = pg_execute($database->mConnection, "f_google_login", array( $email ,$google_id, $id_token, $first_name, $last_name, $club_invite_token));

                $return_value = pg_fetch_result($result, 0);

                $result_set = $database->formatResultSet($return_value);
                echo $result_set;
        }
}
        $googleLogin = new GoogleLogin();
?>
