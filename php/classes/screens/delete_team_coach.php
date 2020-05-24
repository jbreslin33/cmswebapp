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
		$team_club_persons_club_coach_id = 0;

                if (isset($_GET['team_club_persons_club_coach_id']))
                {
                        $team_club_persons_club_coach_id = $_GET['team_club_persons_club_coach_id'];
                }
		error_log("deteTeamc A");

                $sql = 'select f_delete_team_coach($1,$2,$3,$4,$5,$6)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team_coach", $sql);
               	$result = pg_execute($this->mDatabase->mConnection, "f_delete_team_coach", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mTeamId, $this->mClubId, $team_club_persons_club_coach_id));

		error_log("deteTeamc B");

                return pg_fetch_result($result, 0);
        }
}

$deleteTeamCoach = new DeleteTeamCoach();
?>
