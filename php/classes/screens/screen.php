<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class Screen 
{
	function __construct() 
	{
		$this->mDatabase = new Database("localhost","cms","postgres","mibesfat");

		$this->sendToClient();	
	}

	function getSenderEmailId()
	{
		if (isset($_GET['jwt']))
		{
			$jwt = $_GET['jwt'];
		}
		
		//get id of sender
		$oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
		return $payload->email_id;
	}

	function getResult()
	{

	}

        public function formatResultSet($result)
        {
        	$result_array = explode(",",$result);

                $email_id = array_shift($result_array);
                $data = implode(",",$result_array);

                if ($data)
                {
                	//encode
                       	$oneRing = new OneRing();
                       	$encoded_token = array();

                       	$encoded_token['email_id'] = $email_id;
                       	$jwt = JWT::encode($encoded_token, $oneRing->mOneRing);

                       	//$txt =  "-100," . $jwt . "," . $data;
			// we need an extra brace at beginning because we took it away in stored procedures
			$jwt_json = '{ "jwts": [ { "jwt": "' . $jwt . '" } ] ,';

			//for now on always send -100 and jwt or 0 for jwt and then a json data object even for messages
			$txt = $jwt_json . $data;
			error_log($txt);
              		return $txt;
		}
        }

	function sendToClient()
	{
		echo $this->formatResultSet($this->getResult());
	}	
}
?>
