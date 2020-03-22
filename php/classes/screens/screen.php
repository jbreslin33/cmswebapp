<?php 
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/database/database.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/jwt/jwt.php");
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/onering/onering.php");

class Screen 
{
	function __construct() 
	{
		$this->mDatabase = new Database("localhost","footballhome","postgres","mibesfat");

               	$this->mPersonId = 0;
                $this->mClubId = 0;
                $this->mTeamId = 0;

		$this->parseParameters();

		$this->sendToClient();	
	}

	function getToken()
	{
        	return bin2hex(random_bytes(32));
	}

	function parseParameters()
	{
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
	}

	function getSenderEmailId()
	{
		if (isset($_GET['jwt']))
		{
			$jwt = $_GET['jwt'];
		
			//get id of sender
			$oneRing = new OneRing();
                	$payload = JWT::decode($jwt, $oneRing->mOneRing);
			return $payload->email_id;
		}

		else
		{
			error_log('no jwt');
		}
	}

        function getAuthorizationId()
        {
                if (isset($_GET['jwt']))
                {
                        $jwt = $_GET['jwt'];
                }

                //get id of sender
                $oneRing = new OneRing();
                $payload = JWT::decode($jwt, $oneRing->mOneRing);
                return $payload->authorization_id;
        }

	function getResult()
	{
	}
	//why are we sending jwt back and forth????? it should be sent to client once at a login....
	//then client can send it for authorization but no need to send jwt back.

        public function formatResultSet($result)
	{
		$bracket = '{ ';
		$txt = $bracket . $result;
		return $txt;
	}

	function sendToClient()
	{
		$result = $this->formatResultSet($this->getResult()); 	
		echo $result;
	}	
}
?>
