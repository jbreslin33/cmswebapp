<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class Screen 
{
	function __construct() 
	{
		$this->mDatabase = new Database("localhost","cms","postgres","mibesfat");

               	$this->mPersonId = 0;
                $this->mClubId = 0;
                $this->mTeamId = 0;

                if (isset($_GET['person_id']))
                {
                        $this->mPersonId = $_GET['person_id'];
                }
                if (isset($_GET['club_id']))
                {
                        $this->mClubId = $_GET['club_id'];
                }
                if (isset($_GET['team_id']))
                {
                        $this->mTeamId = $_GET['team_id'];
                }

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
		//explode result so we can grab email_id at first elememt
        	$result_array = explode(",",$result);

		//grab email_id
                $email_id = array_shift($result_array);

		//put array into a string
                $data = implode(",",$result_array);

                if ($data)
                {
                	//encode
                       	$oneRing = new OneRing();
                       	$encoded_token = array();

			//encode email_id into jwt 
			if ($email_id > 0)
			{
                       		$encoded_token['email_id'] = $email_id;
                       		$encoded_token['person_id'] = $this->mPersonId;
                       		$encoded_token['club_id'] = $this->mClubId;
                       		$encoded_token['team_id'] = $this->mTeamId;
                       		$jwt = JWT::encode($encoded_token, $oneRing->mOneRing);
				
				// make a jwt json object. Also we need an extra brace at beginning because we took it away in stored procedures
				// also add person_id club_id team_id
				//$jwt_json = '{ "jwts": [ { "jwt": "' . $jwt . '" } ] ,';
				$jwt_json = '{ "jwts": [ { "jwt": "' . $jwt . '","person_id":' . $this->mPersonId . ',"club_id":' . $this->mClubId . ',"team_id":' . $this->mTeamId . '} ] ,';
			}
			else
			{
				// make a jwt json object. Also we need an extra brace at beginning because we took it away in stored procedures
				$jwt_json = '{ ';
			}

			//send only a json object client
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
