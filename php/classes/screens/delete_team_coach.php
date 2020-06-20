<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteTeamCoach extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResult()
        {
                $sql = 'select f_delete_team_coach($1,$2,$3,$4,$5,$6)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team_coach", $sql);
               	$result = pg_execute($this->mDatabase->mConnection, "f_delete_team_coach", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mTeamId, $this->mClubId, $this->team_club_coach_id));

                return pg_fetch_result($result, 0);
        }
}

$deleteTeamCoach = new DeleteTeamCoach();
?>
