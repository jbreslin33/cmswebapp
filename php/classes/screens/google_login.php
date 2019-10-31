<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class GoogleLogin extends Screen
{
        function __construct()
        {
		parent::__construct();
	}

	function getResult()
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

                $sql = 'select f_google_login($1,$2,$3,$4,$5,$6)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_google_login", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_google_login", array( $email ,$google_id, $id_token, $first_name, $last_name, $club_invite_token));

                return pg_fetch_result($result, 0);

        }

	public function formatResultSet($result)
        {
                error_log($result);
                //explode result so we can grab email_id at first elememt
                $result_array = explode(",",$result);

                //grab email_id
                $email_id = array_shift($result_array);

		$authorization_id = 2;

                //put array back into a string
                $data = implode(",",$result_array);

                if ($data)
                {
                        //encode
                        $oneRing = new OneRing();
                        $encoded_token = array();

                        //encode email_id into jwt
                        $encoded_token['email_id'] = $email_id;
                        $encoded_token['authorization_id'] = $authorization_id; //0 none, 1 native, 2 google, 3 ???
                        $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
                        $jwt_json = '{ "jwts": [ { "jwt": "' . $jwt . '"} ] ,';

                        //send only a json object client
                        $txt = $jwt_json . $data;
                        return $txt;
                }
        }
}
        $googleLogin = new GoogleLogin();
?>
