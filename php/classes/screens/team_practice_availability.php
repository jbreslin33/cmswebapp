<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class TeamPracticeAvailabilityScreen extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResult()
	{
                $sql = 'select f_select_team_practice_availability($1,$2,$3)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_team_practice_availability", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_select_team_practice_availability", array( $this->getSenderEmailId(), $this->mPersonId, $this->mPracticeId));
	
		return pg_fetch_result($result, 0);
	}
}

$teamPracticeAvailabilityScreen = new TeamPracticeAvailabilityScreen();
?>


