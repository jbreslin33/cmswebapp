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
		$last_name = null;
		$first_name = null;
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

                $return_value_array = explode(",",$return_value);
                $email_id = array_shift($return_value_array);
                $data = implode(",",$return_value_array);
		error_log($email_id);

                if ($email_id < -100  && $email_id > -200)
                {
                        echo $email_id;
                }
                else
                {
                        if ($data)
                        {
                                //encode
                                $oneRing = new OneRing();
                                $encoded_token = array();
                                $encoded_token['email_id'] = $email_id;
                                $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                                $front = '{ "persons" :';
                                $back = '}';
                                $return_value = "";
                                $return_value .= $front;
                                $return_value .= $data;
                                $return_value .= $back;

                                $txt =  "-100," . $jwt . "," . $return_value;
                                echo $txt;
                        }
                }



/*
		//return to client
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
                                $encoded_token = array();
                                $encoded_token['email_id'] = $email_id;
                                $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                                $front = '{ "persons" :';
                                $back = '}';
                                $return_value = "";
                                $return_value .= $front;
                                $return_value .= $data;
                                $return_value .= $back;

                                $txt =  "-100," . $jwt . "," . $return_value;
                                echo $txt;

                        //encode
                        $secret = 's%%xqc!___bzvReT423*&';
                        $email_id = $return_value;
                        $encoded_token = array();
                        $encoded_token['email_id'] = $email_id;
                        $jwt = JWT::encode($encoded_token, $secret);

                        $txt = "-100," . $jwt;
			error_log($txt);
                        echo "-100," . $jwt;
                }
 */
        }
}
        $googleLogin = new GoogleLogin();
?>
