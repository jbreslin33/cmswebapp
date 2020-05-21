<?php
include_once(getenv("DOCUMENT_ROOT") . "/php/classes/screens/screen.php");

class DeleteTeamManager extends Screen
{
        function __construct()
        {
		parent::__construct();	
	}

	function getResult()
        {
		$team_club_persons_club_manager_id = 0;

                if (isset($_GET['team_club_persons_club_manager_id']))
                {
                        $team_club_persons_club_manager_id = $_GET['team_club_persons_club_manager_id'];
                }

                $sql = 'select f_delete_team_manager($1,$2,$3,$4,$5,$6)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team_manager", $sql);
               	$result = pg_execute($this->mDatabase->mConnection, "f_delete_team_manager", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mTeamId, $this->mClubId, $team_club_persons_club_manager_id));


                return pg_fetch_result($result, 0);
        }
}

$deleteTeamManager = new DeleteTeamManager();
?>
