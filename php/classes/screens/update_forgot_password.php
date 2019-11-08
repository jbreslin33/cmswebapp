<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/mail/mail.php");

class UpdateForgotPassword extends Screen
{
	function __construct() 
	{
		parent::__construct();
	}

	function getResult()
	{
		$forgot_password_token = 0;
		$password = 0;
		$email = 0;
                if (isset($_GET['forgot_password_token']))
                {
                        $forgot_password_token = $_GET['forgot_password_token'];
                }
                if (isset($_GET['password']))
                {
                        $password = $_GET['password'];
                }
                if (isset($_GET['email']))
                {
                        $email = $_GET['email'];
                }

		$txt = 'forgot_password_token:' . $forgot_password_token . ' password:' . $password . ' email:' . $email;
		error_log($txt);

		//mail that you changed password
               	$this->mEmail = $email;
               	$this->mSubject = "Password has been changed.";
               	$this->mURL = "http://elacore.org/#insert_forgot_password_screen";
		$this->mBody = "You have recently changed your password. If this was not you. Click here: ";
		$this->mBody .= $this->mURL;

                $sql = 'select f_update_forgot_password($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_update_forgot_password", $sql);
                $result = pg_execute($this->mDatabase->mConnection, "f_update_forgot_password", array( $forgot_password_token, $password));
		
		$mail = new Mail($this->mEmail,$this->mSubject,$this->mBody);

                return pg_fetch_result($result, 0);
	}

	public function formatResultSet($result)
        {
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
			$authorization_id = 1;
                        $encoded_token['authorization_id'] = $authorization_id; //0 none, 1 native, 2 google, 3 ???
                        $jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
                        $jwt_json = '{ "jwts": [ { "jwt": "' . $jwt . '"} ] ,';

                        //send only a json object client
                        $txt = $jwt_json . $data;
                        return $txt;
                }
        }

}
$updateForgotPassword = new UpdateForgotPassword();	
?>
