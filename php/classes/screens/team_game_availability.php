<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class TeamGameAvailabilityScreen extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResult()
	{
                $sql = 'select f_select_team_game_availability($1,$2)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_select_team_game_availability", $sql);
		$result = pg_execute($this->mDatabase->mConnection, "f_select_team_game_availability", array( $this->mFamilyId, $this->mGameId));
	
		return pg_fetch_result($result, 0);
	}
}

$teamGameAvailabilityScreen = new TeamGameAvailabilityScreen();
?>


