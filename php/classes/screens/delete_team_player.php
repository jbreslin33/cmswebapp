<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteTeamPlayer extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResult()
        {
                $sql = 'select f_delete_team_player($1,$2,$3,$4,$5,$6)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team_player", $sql);
               	$result = pg_execute($this->mDatabase->mConnection, "f_delete_team_player", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mTeamId, $this->mClubId, $this->team_club_player_id));


                return pg_fetch_result($result, 0);
        }
}

$deleteTeamPlayer = new DeleteTeamPlayer();
?>
