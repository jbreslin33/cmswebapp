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
		$team_club_persons_club_player_id = 0;

                if (isset($_GET['team_club_persons_club_player_id']))
                {
                        $team_club_persons_club_player_id = $_GET['team_club_persons_club_player_id'];
                }

                $sql = 'select f_delete_team_player($1,$2,$3,$4,$5,$6)';
                $prepare_result = pg_prepare($this->mDatabase->mConnection, "f_delete_team_player", $sql);
               	$result = pg_execute($this->mDatabase->mConnection, "f_delete_team_player", array( $this->getSenderEmailId(), $this->mPersonId, $this->mScreenPersonId, $this->mTeamId, $this->mClubId, $team_club_persons_club_player_id));


                return pg_fetch_result($result, 0);
        }
}

$deleteTeamPlayer = new DeleteTeamPlayer();
?>
