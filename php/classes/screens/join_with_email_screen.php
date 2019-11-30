<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class JoinWithEmailScreen extends Screen 
{
	function __construct() 
	{
		parent::__construct();	
	}
		
	function getResult()
	{
                //create mail
		$token = $this->getToken();
                $email = $_GET['email'];
                $this->mSubject = "Confirm email Link";
                $this->mAbsoluteURL = "http://elacore.org/#confirm_email_screen&";

                $this->mUrl = sprintf('%s%s', $this->mAbsoluteURL, http_build_query([
                        'token' => $token,
                        'email' => $email
                        ]));
                $this->mBody = "Click the link to confirm email: ";
                $this->mBody .= $this->mUrl;

		//essentially if you have a native_login entry in db you are confirmed

		//so at this point we are looking at email not existing,
		          //then send join with email
			  //which will insert email with token then send email to make a native login
	 	//OR email existing THEN
			//if existing 
				//send back to login or update password
		$sql = 'select f_join_with_email($1,$2,$3)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_join_with_email", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_join_with_email", array( $_GET['email'], $token));

	       	$mail = new Mail($email,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);
	}

	public function formatResultSet($result)
        {
                //explode result so we can grab email_id at first elememt
                $result_array = explode(",",$result);

                //grab email_id
                $email_id = array_shift($result_array);

                $authorization_id = 1;

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

$insertNativeLogin = new InsertNativeLogin();	

?>
