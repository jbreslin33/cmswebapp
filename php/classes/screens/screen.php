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
               	$this->mScreenPersonId = 0;
                $this->mClubId = 0;
                $this->mTeamId = 0;
                $this->mPitchId = 0;
		$this->mName = null;
		$this->mGameId = null;
		$this->mPracticeId = null;
		
		$this->team_club_player_id = 0;
		$this->team_club_parent_id = 0;
		$this->team_club_coach_id = 0;
		$this->team_club_manager_id = 0;

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
                if (isset($_GET['screen_person_id']))
                {
                        $this->mScreenPersonId = $_GET['screen_person_id'];
                }
                if (isset($_GET['club_id']))
                {
                        $this->mClubId = $_GET['club_id'];
                }
                if (isset($_GET['team_id']))
                {
                        $this->mTeamId = $_GET['team_id'];
                }
                if (isset($_GET['pitch_id']))
                {
                        $this->mPitchId = $_GET['pitch_id'];
                }
                if (isset($_GET['name']))
                {
                        $this->mName = $_GET['name'];
                }
                if (isset($_GET['game_id']))
                {
                        $this->mGameId = $_GET['game_id'];
                }
                if (isset($_GET['practice_id']))
                {
                        $this->mPracticeId = $_GET['practice_id'];
                }
                if (isset($_GET['team_club_player_id']))
                {
                        $this->team_club_player_id = $_GET['team_club_player_id'];
                }
                if (isset($_GET['team_club_parent_id']))
                {
                        $this->team_club_parent_id = $_GET['team_club_parent_id'];
                }
                if (isset($_GET['team_club_coach_id']))
                {
                        $this->team_club_coach_id = $_GET['team_club_coach_id'];
                }
                if (isset($_GET['team_club_manager_id']))
                {
                        $this->team_club_manager_id = $_GET['team_club_manager_id'];
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
		$front_bracket = '{ ';
		$back_bracket = '}';
		$txt = $front_bracket . $result . $back_bracket;
		return $txt;
	}

	function sendToClient()
	{
		$result = $this->formatResultSet($this->getResult()); 	
		echo $result;
	}	
}
?>
