<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class InsertNativeLoginScreen extends Screen 
{
	function __construct() 
	{
		parent::__construct();	
	}
		
	function getResult()
	{
		$sql = 'select f_insert_native_login($1,$2)';
		$prepare_result = pg_prepare($this->mDatabase->mConnection, "f_insert_native_login", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_insert_native_login", array( $_GET['insert_native_login_token'] , $_GET['password']));
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

$insertNativeLoginScreen = new InsertNativeLoginScreen();	

?>
